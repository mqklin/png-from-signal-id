const BigNumber = require('bignumber.js');

function triadeNumber(number) {
  const [int, float] = String(number).split('.');
  const triadedInt = [...int]
    .reverse()
    .reduce((acc, value, idx) => idx % 3 === 0 ? `${acc},${value}` : `${acc}${value}`, '')
    .split('')
    .reverse()
    .join('')
    .slice(0, -1)
  ;
  if (float) {
    return [triadedInt, float].join('.');
  }
  return triadedInt;
}




exports.roundTokenValue = function(_value, symbol) {
  try {
    const decimalPlaces = symbol && ['USD', 'USDT'].includes(symbol.split('/')[1]) && BigNumber(_value).gte(2) ? 2 : null;

    const value = BigNumber(_value);

    if (value.isNaN()) {
      throw new Error(`roundTokenValue: BigNumber(${JSON.stringify(_value)}) is NaN`);
    }

    if (value.isInteger()) {
      return triadeNumber(value.toFixed(decimalPlaces || 0));
    }

    const [int, float] = value.toFixed().split('.');

    if (float[0] !== '0') {
      return triadeNumber(value.times(10000).integerValue().div(10000).toFixed(decimalPlaces));
    }

    const notZeroIdx = [...float].findIndex(c => c !== '0');
    if (int > 0 && notZeroIdx > 6) {
      return triadeNumber(BigNumber(int).toFixed(decimalPlaces));
    }
    const decimals = BigNumber(`0.${float.slice(notZeroIdx)}`).times(1000).integerValue().div(1000).toFixed();
    const zerosAmount = decimals === '1' ? notZeroIdx - 1 : notZeroIdx;
    const zeros = Array(zerosAmount).fill(0).join('');
    return triadeNumber(BigNumber(`${int}.${zeros}${decimals === '1' ? '1' : decimals.slice(2)}`).toFixed(decimalPlaces));
  }
  catch (e) {
    return '⚠';
  }
}
