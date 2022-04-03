const {getChartData, timeframe_15_min} = require('./getChartData');
const fs = require('fs');
const path = require('path');
const {convert} = require('convert-svg-to-png');

const gray20 = '#7A859E';
const dragon = '#65B67D';
const phoenix = '#E4645B';
const gray70 = '#1E2028';

exports.createImage = async ({forecast, signalsContractAddress, imagePath}) => {
  const width = 1200;
  const height = 630;
  const margin = 32;
  console.log(forecast);

  const {signalOpenDateIndex, signalCloseDateIndex, prices} = await getChartData(forecast, timeframe_15_min);

  const chartPoints = prices.map(({datetime, value}) => [Number(new Date(datetime)), value]);

  const minDate = Math.min(...chartPoints.map(([x]) => x));
  const minPrice = Math.min(...chartPoints.map(([, y]) => y));

  const shiftedChartPoints = chartPoints.map(([x, y]) => [x - minDate, y - minPrice]);

  const maxShiftedDate = Math.max(...shiftedChartPoints.map(([x]) => x));
  const maxShiftedPrice = Math.max(...shiftedChartPoints.map(([, y]) => y));

  const points = shiftedChartPoints.map(([x, y]) => [x / maxShiftedDate * width, height - y / maxShiftedPrice * height]);
  const marginPoints = points.map(([x, y]) => [(x - width / 2) * (width / 2 - margin) / (width / 2) + width / 2, (y - height / 2) * (height / 2 - margin) / (height / 2) + height / 2]);

  const svg = `
    <svg width=${width} height=${height} preserveAspectRatio="none" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <polyline
        fill="none"
        points="${marginPoints.map(([x, y]) => `${x},${y}`).join(' ')}"
        stroke=${gray20}
        strokeWidth="1"
      />
      <polyline
        fill="none"
        points="${marginPoints.slice(signalOpenDateIndex, signalCloseDateIndex || undefined).map(([x, y]) => `${x},${y}`).join(' ')}"
        stroke="${signalCloseDateIndex === null ? gray70 : forecast.performance > 0 ? dragon : phoenix}"
        strokeWidth="1"
      />
    </svg>
  `.replace(/\n/g, '');


  fs.writeFileSync(imagePath, await convert(svg));
};
