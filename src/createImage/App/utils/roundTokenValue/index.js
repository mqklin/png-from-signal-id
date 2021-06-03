import BigNumber from 'bignumber.js';


export default function roundTokenValue(_value, symbol) {
  const decimalPlaces = symbol && symbol.split('/')[1] === 'USD' ? 2 : null;

  const value = BigNumber(_value);

  if (value.isNaN()) {
    throw new Error(`roundTokenValue: BigNumber(${JSON.stringify(_value)}) is NaN`);
  }

  if (value.isInteger()) {
    return value.toFixed(decimalPlaces || 0);
  }

  const [int, float] = value.toFixed().split('.');

  if (float[0] !== '0') {
    return value.times(1000).integerValue().div(1000).toFixed(decimalPlaces);
  }

  const notZeroIdx = [...float].findIndex(c => c !== '0');
  if (int > 0 && notZeroIdx > 6) {
    return BigNumber(int).toFixed(decimalPlaces);
  }
  const decimals = BigNumber(`0.${float.slice(notZeroIdx)}`).times(1000).integerValue().div(1000).toFixed();
  const zerosAmount = decimals === '1' ? notZeroIdx - 1 : notZeroIdx;
  const zeros = Array(zerosAmount).fill(0).join('');
  return BigNumber(`${int}.${zeros}${decimals === '1' ? '1' : decimals.slice(2)}`).toFixed(decimalPlaces);
}
