const {getChartData, timeframe_15_min} = require('./getChartData');
const fs = require('fs');
const path = require('path');
const {convert} = require('convert-svg-to-png');
const sharp = require('sharp');

const gray20 = '#7A859E';
const dragon = '#65B67D';
const phoenix = '#E4645B';
const gray70 = '#1E2028';
const gray40 = '#464A5C';

exports.createImage = async ({forecast, signalsContractAddress, imagePath}) => {
  const width = 1200;
  const height = 630;
  const marginX = 32;
  const marginY = 80;

  const {signalOpenDateIndex, signalCloseDateIndex, prices} = await getChartData(forecast, timeframe_15_min);

  const chartPoints = prices.map(({datetime, value}) => [Number(new Date(datetime)), value]);

  const minDate = Math.min(...chartPoints.map(([x]) => x));
  const minPrice = Math.min(...chartPoints.map(([, y]) => y));

  const shiftedChartPoints = chartPoints.map(([x, y]) => [x - minDate, y - minPrice]);

  const maxShiftedDate = Math.max(...shiftedChartPoints.map(([x]) => x));
  const maxShiftedPrice = Math.max(...shiftedChartPoints.map(([, y]) => y));

  const points = shiftedChartPoints.map(([x, y]) => [x / maxShiftedDate * width, height - y / maxShiftedPrice * height]);
  const marginPoints = points.map(([x, y]) => [(x - width / 2) * (width / 2 - marginX) / (width / 2) + width / 2, (y - height / 2) * (height / 2 - marginY) / (height / 2) + height / 2]);

  function triangle(idx, rise, withText) {
    const riseX1 = marginPoints[idx][0] - 7;
    const riseX2 = marginPoints[idx][0] + 7;
    const riseY =  marginPoints[idx][1] + 10;

    const setX1 = marginPoints[idx][0] - 7;
    const setX2 = marginPoints[idx][0] + 7;
    const setY =  marginPoints[idx][1] - 10;

    const rectWidth = 4;
    const rectHeight = 15;
    return `
      <polyline
        fill="${gray40}"
        points="${marginPoints[idx].join(',')} ${setX1},${rise ? riseY : setY} ${setX2},${rise ? riseY : setY}"
      />
      <rect
        fill="${gray40}"
        x="${(setX2 + setX1) / 2 - rectWidth / 2}"
        y="${rise ? riseY : setY - rectHeight}"
        width="${rectWidth}"
        height="${rectHeight}"
      />
      <g transform="translate(${(setX2 + setX1) / 2 - rectWidth / 2 - 50}, ${(rise ? riseY : setY) + (rise ? 1 : -1) * rectHeight - 9 + (rise ? 12 : -8)})">
        <svg height="18" width="100">
          <text alignment-baseline="middle" x="50%" text-anchor="middle" y="50%" font-size="1.05em">${withText ? `San.${rise ? 'Rise' : 'Set'}` : 'Close'}</text>
        </svg>
      </g>
    `;
  }

  const svg = `
    <svg width="${width}" height="${height}" preserveAspectRatio="none" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <polyline
        fill="none"
        points="${marginPoints.map(([x, y]) => `${x},${y}`).join(' ')}"
        stroke="${gray20}"
        strokeWidth="1"
      />
      <polyline
        fill="none"
        points="${marginPoints.slice(signalOpenDateIndex, signalCloseDateIndex || undefined).map(([x, y]) => `${x},${y}`).join(' ')}"
        stroke="${signalCloseDateIndex === null ? gray70 : forecast.performance > 0 ? dragon : phoenix}"
        strokeWidth="1"
      />
      ${triangle(signalOpenDateIndex, forecast.direction === 'up', true)}
      ${signalCloseDateIndex !== null ? triangle(signalCloseDateIndex, forecast.direction !== 'up', false) : ''}
    </svg>
  `.replace(/\n/g, '');


  await sharp(Buffer.from(svg)).png().toFile(imagePath);
};
