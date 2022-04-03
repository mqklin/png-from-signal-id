/* eslint-disable import/no-nodejs-modules */

import ReactDOMServer from 'react-dom/server';

import getChartData, {timeframe_15_min} from 'App/utils/getChartData';
import fs from 'fs';
import path from 'path';
import {convert} from 'convert-svg-to-png';

export async function createImage({forecast, signalsContractAddress, imagePath}) {
  const contentWidth = 1800;
  const contentMargin = 16;
  const bodyWidth = contentWidth + contentMargin * 2;
  const chartHeight = 640;

  const chartData = await getChartData(forecast, timeframe_15_min);

  const svg = `
    <svg width="100" height="100" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <g>
          <svg height="18" width="100">
            <text alignmentBaseline="middle" textAnchor="middle" x="50%" y="50%">Performance</text>
          </svg>
        </g>
      </g>
    </svg>
  `.replace(/\n/g, '');
  fs.writeFileSync(imagePath, await convert(svg));
}
