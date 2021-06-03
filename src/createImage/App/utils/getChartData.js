import moment from 'moment';
import TOKENS, {LEND} from 'App/constants/TOKENS';
import {captureException} from 'App/utils';
import fetch from 'node-fetch';


function fetchSanApi(body) {
  const options = {
    method: 'POST',
    body,
  };
  return fetch('https://api.santiment.net/graphql', options);
}

export const timeframe_15_min = 'timeframe_15_min';
export const timeframe_4_h = 'timeframe_4_h';


function getTimestamp(time) {
  return new Date(time).getTime();
}

export default async function getChartData(forecast, timeframe = timeframe_4_h) {
  let interval;
  switch (timeframe) {
    case timeframe_4_h:
      interval = '4h';
      break;
    case timeframe_15_min:
      interval = '15m';
      break;
    default:
      throw new Error(`Invalid timeframe ${timeframe}`);
  }
  try {
    const {
      symbol,
      signalOpenDate,
      signalCloseDate,
      signalOpenPrice,
      signalClosePrice,
      competitionStartDate,
      competitionEndDate,
      competitionStartPrice,
      competitionEndPrice,
    } = forecast;
    const to = symbol
      ? moment().diff(signalOpenDate, 'w') < 3 ? moment() : moment(signalOpenDate).add(moment(signalCloseDate).diff(signalOpenDate, 'seconds') / 2, 'seconds').add(2, 'w')
      : moment()
    ;
    const prices = await getPrices({
      symbol,
      from: moment(to).subtract(4, 'w'),
      to,
      interval,
    });
    const signalOpenDateTimestamp = getTimestamp(signalOpenDate);
    let signalOpenDateIndex;
    if (signalOpenDateTimestamp > getTimestamp(prices.slice(-1)[0].datetime)) {
      signalOpenDateIndex = prices.length;
      prices.push({datetime: moment(signalOpenDate).utc().format(), value: signalOpenPrice});
    }
    else {
      const signalOpenDateISO = moment(signalOpenDate).utc().format();
      for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i].datetime === signalOpenDateISO) {
          signalOpenDateIndex = i;
          break;
        }
        if (signalOpenDateTimestamp > getTimestamp(prices[i].datetime) && signalOpenDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
          signalOpenDateIndex = i + 1;
          prices.splice(i + 1, 0, {datetime: moment(signalOpenDate).utc().format(), value: signalOpenPrice});
          break;
        }
      }
    }
    let signalCloseDateIndex;
    if (!signalCloseDate) {
      signalCloseDateIndex = null;
      if (moment().diff(signalOpenDate, 'minutes') > 1) {
        prices.push({datetime: moment().utc().format(), value: signalClosePrice});
      }
    }
    else {
      const signalCloseDateTimestamp = getTimestamp(signalCloseDate);
      if (signalCloseDateTimestamp > getTimestamp(prices.slice(-1)[0].datetime)) {
        signalCloseDateIndex = prices.length;
        prices.push({datetime: moment(signalCloseDate).utc().format(), value: signalClosePrice});
      }
      else {
        for (let i = signalOpenDateIndex; i < prices.length - 1; i++) {
          if (signalCloseDateTimestamp > getTimestamp(prices[i].datetime) && signalCloseDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
            signalCloseDateIndex = i + 1;
            prices.splice(i + 1, 0, {datetime: moment(signalCloseDate).utc().format(), value: signalClosePrice});
            break;
          }
        }
      }
    }
    let competitionStartDateIndex;
    if ([undefined, signalOpenDate].includes(competitionStartDate)) { // eslint-disable-line no-undefined
      competitionStartDateIndex = signalOpenDateIndex;
    }
    else {
      const competitionStartDateTimestamp = getTimestamp(competitionStartDate);
      const competitionStartDateISO = moment(competitionStartDate).utc().format();
      for (let i = signalOpenDateIndex; i < prices.length - 1; i++) {
        if (prices[i + 1].datetime === competitionStartDateISO) {
          competitionStartDateIndex = i + 1;
          break;
        }
        if (competitionStartDateTimestamp > getTimestamp(prices[i].datetime) && competitionStartDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
          competitionStartDateIndex = i + 1;
          prices.splice(i + 1, 0, {datetime: competitionStartDateISO, value: competitionStartPrice});
          if (signalCloseDateIndex !== null) {
            signalCloseDateIndex++;
          }
          if (signalOpenDateIndex > competitionStartDateIndex) {
            signalOpenDateIndex++;
          }
          break;
        }
      }
    }

    let competitionEndDateIndex;
    if ([undefined, signalCloseDate].includes(competitionEndDate)) { // eslint-disable-line no-undefined
      competitionEndDateIndex = signalCloseDateIndex;
    }
    else {
      const competitionEndDateTimestamp = getTimestamp(competitionEndDate);
      for (let i = signalOpenDateIndex; i < prices.length - 1; i++) {
        if (competitionEndDateTimestamp > getTimestamp(prices[i].datetime) && competitionEndDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
          competitionEndDateIndex = i + 1;
          prices.splice(i + 1, 0, {datetime: moment(competitionEndDateTimestamp).utc().format(), value: competitionEndPrice});
          if (signalCloseDateIndex !== null && signalCloseDateIndex > competitionEndDateIndex) {
            signalCloseDateIndex++;
          }
          break;
        }
      }
    }
    return {prices, signalOpenDateIndex, signalCloseDateIndex, competitionStartDateIndex, competitionEndDateIndex};
  }
  catch (e) {
    throw e;
  }
}

function getPrices({symbol, from, to, interval}) {
  const token = TOKENS.find(token => token.symbol === symbol);
  if (!token) {
    captureException(new Error('No symbol'), {symbol});
  }
  const {slug, metric, id} = token;
  return fetchSanApi(`
    {
      getMetric(metric:"${metric}") {
        timeseriesData(
          slug:"${slug}",
          from:"${from.toISOString()}",
          to:"${to.toISOString()}",
          interval: "${interval}",
        ) {
          value
          datetime
        }
      }
    }
  `)
    .then(response => response.json())
    .then(({data, errors}) => {
      if (errors) {
        throw new Error(JSON.stringify(errors));
      }
      if (id === LEND) {
        data.getMetric.timeseriesData = data.getMetric.timeseriesData.map(({datetime, value}) => {
          const momentDatetime = moment(datetime);
          if (momentDatetime.isAfter('2020-10-19T13:00:00Z') && momentDatetime.isBefore('2020-10-19T16:00:00Z') && value > 0.001 || momentDatetime.isSameOrAfter('2020-10-19T16:00:00Z')) {
            value /= 100;
          }
          return {datetime, value};
        });
      }
      return data.getMetric.timeseriesData;
    })
    .catch(e => {
      throw e;
    });
}
