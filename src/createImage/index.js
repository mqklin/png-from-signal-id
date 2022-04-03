/* eslint-disable import/no-nodejs-modules */

import getChartData, {timeframe_15_min} from 'App/utils/getChartData';
import fs from 'fs';
import path from 'path';
import {convert} from 'convert-svg-to-png';

export async function createImage({forecast, signalsContractAddress, imagePath}) {

  const chartData = await getChartData(forecast, timeframe_15_min);
  console.log(chartData);

  const svg = `
    <svg width="1200" height="630" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
    </svg>
  `.replace(/\n/g, '');
  fs.writeFileSync(imagePath, await convert(svg));
}
