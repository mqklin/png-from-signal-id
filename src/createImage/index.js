/* eslint-disable import/no-nodejs-modules */

import getChartData, {timeframe_15_min} from 'App/utils/getChartData';
import fs from 'fs';
import path from 'path';
import {convert} from 'convert-svg-to-png';

export async function createImage({forecast, signalsContractAddress, imagePath}) {
  const width = 1200;
  const height = 630;

  const {signalOpenDateIndex, signalCloseDateIndex, prices} = await getChartData(forecast, timeframe_15_min);

  const chartPoints = prices.map(({datetime, value}) => [Number(new Date(datetime)), value]);

  const minDate = Math.min(...chartPoints.map(([x]) => x));
  const minPrice = Math.min(...chartPoints.map(([, y]) => y));

  const shiftedChartPoints = chartPoints.map(([x, y]) => [x - minDate, y - minPrice]);

  const maxShiftedDate = Math.max(...shiftedChartPoints.map(([x]) => x));
  const maxShiftedPrice = Math.max(...shiftedChartPoints.map(([, y]) => y));

  const points = shiftedChartPoints.map(([x, y]) => [x / maxShiftedDate * width, y / maxShiftedPrice * height]);

  const svg = `
    <svg width=${width} height=${height} preserveAspectRatio="none" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <polyline
        fill="none"
        points="${points.map(([x, y]) => `${x},${height - y}`).join(' ')}"
        stroke="#7A859E"
        strokeWidth="1"
      />
    </svg>
  `.replace(/\n/g, '');


  fs.writeFileSync(imagePath, await convert(svg));
}
