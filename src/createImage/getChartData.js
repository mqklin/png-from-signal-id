const moment = require('moment');
const {TOKENS} = require('./TOKENS');
const fetch = require('node-fetch');


function fetchSanApi(body) {
  const options = {
    method: 'POST',
    body,
  };
  return fetch('https://api.santiment.net/graphql', options);
}

const timeframe_15_min = 'timeframe_15_min';
const timeframe_4_h = 'timeframe_4_h';
const timeframe_2_h = 'timeframe_2_h';
exports.timeframe_15_min = timeframe_15_min;

function getTimestamp(time) {
  return new Date(time).getTime();
}

exports.getChartData = async (forecast, timeframe = timeframe_4_h) => {
  let interval;
  switch (timeframe) {
    case timeframe_4_h:
      interval = '4h';
      break;
    case timeframe_15_min:
      interval = '15m';
      break;
    case timeframe_2_h:
      interval = '2h';
      break;
    default:
      throw new Error(`Invalid timeframe ${timeframe}`);
  }
  try {
    const {
      symbol,
      openDate,
      closeDate,
      openPrice,
      closePrice,
    } = forecast;
    const to = symbol
      ? moment().diff(openDate, 'w') < 3 ? moment() : moment(openDate).add(moment(closeDate).diff(openDate, 'seconds') / 2, 'seconds').add(2, 'w')
      : moment()
    ;
    const prices = await getPrices({
      symbol,
      from: moment(to).subtract(4, 'w'),
      to,
      interval,
    });
    const signalOpenDateTimestamp = getTimestamp(openDate);
    let signalOpenDateIndex;
    if (signalOpenDateTimestamp > getTimestamp(prices.slice(-1)[0].datetime)) {
      signalOpenDateIndex = prices.length;
      prices.push({datetime: moment(openDate).utc().format(), value: openPrice});
    }
    else {
      const signalOpenDateISO = moment(openDate).utc().format();
      for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i].datetime === signalOpenDateISO) {
          signalOpenDateIndex = i;
          break;
        }
        if (signalOpenDateTimestamp > getTimestamp(prices[i].datetime) && signalOpenDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
          signalOpenDateIndex = i + 1;
          prices.splice(i + 1, 0, {datetime: moment(openDate).utc().format(), value: openPrice});
          break;
        }
      }
    }
    let signalCloseDateIndex;
    if (!closeDate) {
      signalCloseDateIndex = null;
      if (moment().diff(openDate, 'minutes') > 1) {
        prices.push({datetime: moment().utc().format(), value: closePrice});
      }
    }
    else {
      const signalCloseDateTimestamp = getTimestamp(closeDate);
      if (signalOpenDateTimestamp === signalCloseDateTimestamp) {
        signalCloseDateIndex = signalOpenDateIndex;
      }
      else if (signalCloseDateTimestamp > getTimestamp(prices.slice(-1)[0].datetime)) {
        signalCloseDateIndex = prices.length;
        prices.push({datetime: moment(closeDate).utc().format(), value: closePrice});
      }
      else {
        for (let i = signalOpenDateIndex; i < prices.length - 1; i++) {
          if (signalCloseDateTimestamp > getTimestamp(prices[i].datetime) && signalCloseDateTimestamp < getTimestamp(prices[i + 1].datetime)) {
            signalCloseDateIndex = i + 1;
            prices.splice(i + 1, 0, {datetime: moment(closeDate).utc().format(), value: closePrice});
            break;
          }
        }
      }
    }

    return {prices, signalOpenDateIndex, signalCloseDateIndex};
  }
  catch (e) {
    throw e;
  }
};

function getPrices({symbol, from, to, interval}) {
  const token = TOKENS.find(token => token.symbol === symbol);
  if (!token) {
    console.error(new Error(`No symbol ${symbol}`));
  }
  const {slug, metric} = token;
  return fetchSanApi(`
    {
      getMetric(metric:"${metric}") {
        timeseriesData(
          slug:"${slug}",
          from:"${from.toISOString()}",
          to:"${to.toISOString()}",
          interval: "${interval}",
          selector: {source: "cryptocompare"}
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

      return data.getMetric.timeseriesData;
    })
    .catch(e => {
      throw e;
    });
}
