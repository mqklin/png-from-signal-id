/* globals __dirname */
/* eslint-disable import/no-nodejs-modules */

import ReactDOMServer from 'react-dom/server';

const nodeHtmlToImage = require('node-html-to-image');
import {ServerStyleSheet} from 'styled-components';
import jsdom from 'jsdom';
import App from 'App';
import getChartData, {timeframe_15_min} from 'App/utils/getChartData';
import fs from 'fs';
import path from 'path';
// import sharp from 'sharp';

const [
  lightweightChartSource,
  requestAnimationFrameSource,
  matchMediaSource,
] = [
  fs.readFileSync(path.join(__dirname, '../src/shims/lightweight-charts.standalone.js'), 'utf8'),
  fs.readFileSync(path.join(__dirname, '../src/shims/requestAnimationFrame.js'), 'utf8'),
  fs.readFileSync(path.join(__dirname, '../src/shims/matchMedia.js'), 'utf8'),
];

const {JSDOM} = jsdom;

export async function createImage({forecast, imagePath}) {
  const imageWidth = 721;
  const imageHeight = 376;
  const K = 2;
  const bannerHeight = 50;
  const contentWidth = imageWidth * K;
  const contentMargin = 0;
  const bodyWidth = contentWidth + contentMargin * 2;
  const chartHeight = (imageHeight - bannerHeight) * K;

  const chartData = await getChartData(forecast, timeframe_15_min);
  const sheet = new ServerStyleSheet();
  let html = ReactDOMServer.renderToStaticMarkup(sheet.collectStyles(
    <App
      bannerHeight={bannerHeight * K}
      contentMargin={contentMargin}
      contentWidth={contentWidth}
    />,
  ));
  const styleTags = sheet.getStyleTags();


  html = html
    .replace(
      '<html>',
      '<!DOCTYPE html><html>',
    )
    .replace(
      '<body>',
      `<body>${styleTags}`,
    )
    .replace(
      '<body>',
      `<body><style>
              body {
                width: ${bodyWidth}px;
                height: ${chartHeight + bannerHeight * K}px;
                border: 3px solid #DDDFE8;
              }
            </style>`,
    )
    .replace(
      '</body>',
      `
        <script>
          ${lightweightChartSource}
          ${requestAnimationFrameSource}
          ${matchMediaSource}
        </script>
        <script>
          const chartHeight = ${chartHeight};
          const chartWidth = ${contentWidth}

          const minutesTzOffset = new Date().getTimezoneOffset();

          function getTimestamp(date) {
            return (new Date(date).getTime() - minutesTzOffset * 60 * 1000) / 1000;
          }

          const hashes = {
            gray0: '#DDDFE8',
            gray5: '#F7F8FA',
            gray10: '#AAB2C5',
            gray20: '#7A859E',
            gray25: '#E9EAF0',
            gray30: '#51566A',
            gray40: '#464A5C',
            gray70: '#1E2028',
            gray90: '#0B0C0F',
            white: '#fff',
            alert: '#FFF1A6',
            primary: '#0DB67A',
            primaryHover: '#0EC987',
            primaryLt: '#E4FDF4',
            secondary: '#FF393C',
            secondaryHover: '#FF4D50',
            secondaryLt: '#FFEBEC',
            secondaryDk: '#CD0003',
            alt: '#265CC6',
            altHover: '#2F67D7',
            altLt: '#EFF6FF',
          };

          const forecast = ${JSON.stringify(forecast)};
          const {direction, signalPerformance} = forecast;
          const {prices, signalOpenDateIndex, signalCloseDateIndex} = ${JSON.stringify(chartData)};;
          const minPriceLog10 = Math.log10(Math.min(...prices.map(p => p.value)));
          const precision = minPriceLog10 > 0 ? 2 : -Math.ceil(minPriceLog10) + 3;
          const minMove = 1 / 10 ** precision;
          const [[position1, shape1, text1], [position2, shape2, text2]] = direction === 'up'
            ? [['belowBar', 'arrowUp', 'San.Rise'], ['aboveBar', 'arrowDown', 'Closed']]
            : [['aboveBar', 'arrowDown', 'San.Set'], ['belowBar', 'arrowUp', 'Closed']]
          ;
          window.document.querySelector('#chart-wr').innerHTML = '';
          const charts = [[window.document.querySelector('#chart-wr'), signalOpenDateIndex, signalCloseDateIndex, signalPerformance]];
          charts.forEach(([chartRef, startIndex, endIndex, perf]) => {
            const chart = window.LightweightCharts.createChart(
              chartRef,
              {
                width: chartWidth,
                height: chartHeight,
                timeScale: {
                  visible: false,
                },
                handleScale: false,
                grid: {
                  vertLines: {
                    style: 3,
                  },
                  horzLines: {
                    style: 3,
                  },
                },
                layout: {
                  textColor: hashes['gray20'],
                },
                priceScale: {
                  visible: false,
                },
              },
            );

            const seriesCommonOptions = {
              lastValueVisible: false,
              priceLineVisible: false,
              lineWidth: 1.5,
              priceFormat: {
                precision,
                minMove,
              },
            };

            const series1 = chart.addLineSeries({
              ...seriesCommonOptions,
              color: hashes['gray20'],
            });
            series1.setData(prices.slice(0, startIndex + 1).map(p => ({time: getTimestamp(p.datetime), value: p.value})));
            series1.setMarkers([{time: getTimestamp(prices[startIndex].datetime), position: position1, color: hashes['gray40'], shape: shape1, size: 4, text: text1}]);

            if (endIndex === null) {
              const series2 = chart.addLineSeries({
                ...seriesCommonOptions,
                color: hashes[perf > 0 ? 'primary' : perf < 0 ? 'secondary' : 'gray20'],
              });
              series2.setData(prices.slice(startIndex).map(p => ({time: getTimestamp(p.datetime), value: p.value})));
            }
            else {
              const series3 = chart.addLineSeries({
                ...seriesCommonOptions,
                color: hashes['gray20'],
              });
              series3.setData(prices.slice(endIndex).map(p => ({time: getTimestamp(p.datetime), value: p.value})));
              series3.setMarkers([{time: getTimestamp(prices[endIndex].datetime), position: position2, color: hashes['gray40'], shape: shape2, size: 4, text: text2}]);
              const series2 = chart.addLineSeries({
                ...seriesCommonOptions,
                color: hashes[perf > 0 ? 'primary' : perf < 0 ? 'secondary' : 'gray20'],
              });
              series2.setData(prices.slice(startIndex, endIndex + 1).map(p => ({time: getTimestamp(p.datetime), value: p.value})));
            }

            let counter = 0;
            const f = () => {
              if (counter === 0) { // skip first rendering, wait for fitContent
                counter++;
                return;
              }
              const VISIBLE_MARGIN = 80;
              const logicalRange = chart.timeScale().getVisibleLogicalRange();
              const visiblePointsCount = logicalRange.to - logicalRange.from;
              if (endIndex === null) { // signal is not closed
                const signalPointsCount = prices.length - startIndex;
                if (visiblePointsCount < signalPointsCount + VISIBLE_MARGIN * 2) { // signal doesn't fit in a viewport
                  chart.timeScale().scrollToPosition(-prices.length + startIndex + visiblePointsCount - VISIBLE_MARGIN, true); // move to the signal open date
                }
                else {
                  chart.timeScale().scrollToPosition(VISIBLE_MARGIN, true); // move a little bit to the right
                }
              }
              else {
                const signalPointsCount = endIndex - startIndex;
                const scrollToChartCenterPosition = -prices.length + endIndex - (endIndex - startIndex) / 2 + visiblePointsCount / 2;
                if (
                  scrollToChartCenterPosition > 0 || // scroll to the center will look ugly
                  endIndex + VISIBLE_MARGIN > prices.length && visiblePointsCount >= endIndex - startIndex + VISIBLE_MARGIN * 2 // signal close date is very close to the moment
                ) {
                  chart.timeScale().scrollToPosition(VISIBLE_MARGIN, true); // move a little bit to the right
                }
                else if (visiblePointsCount - (prices.length + scrollToChartCenterPosition) > VISIBLE_MARGIN) { // scroll to the center will look ugly
                  chart.timeScale().scrollToPosition(-prices.length - VISIBLE_MARGIN + visiblePointsCount, true); // move a little bit to the left
                }
                else {
                  if (visiblePointsCount >= signalPointsCount + VISIBLE_MARGIN * 2) { // signal fits in a viewport
                    chart.timeScale().scrollToPosition(scrollToChartCenterPosition, true); // move to the signal center
                  }
                  else {
                    chart.timeScale().scrollToPosition(-prices.length + startIndex + visiblePointsCount - VISIBLE_MARGIN, true); // move to the signal open date
                  }
                }
              }

              chart.timeScale().unsubscribeVisibleLogicalRangeChange(f);
            };
            chart.timeScale().subscribeVisibleLogicalRangeChange(f);
            chart.timeScale().fitContent();
          });
        </script>
        </body>
      `,
    );

  const dom = new JSDOM(html, {runScripts: 'dangerously'});

  return nodeHtmlToImage({
    output: imagePath,
    html: dom.window.document.documentElement.innerHTML,
  });
  // .then(() => {
  //   fs.readFile(imagePath, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     sharp(data).resize(740, 379).toFile(imagePath, (err, info) => console.log(err, info));
  //   });
  // });
}
