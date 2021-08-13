import moment from 'moment';

function getTimestamp(time) {
  return new Date(time).getTime();
}

export default async function getChartData(forecast, prices) {
  try {
    const {
      signalOpenDate,
      signalCloseDate,
      signalOpenPrice,
      signalClosePrice,
      competitionStartDate,
      competitionEndDate,
      competitionStartPrice,
      competitionEndPrice,
    } = forecast;
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
