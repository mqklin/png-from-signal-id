const fs = require('fs'); // eslint-disable-line import/no-nodejs-modules
const {createImage} = require('../build/index.js');

const forecast = {
  closeType: 'by_issuer',
  direction: 'down',
  id: '55233',
  inCompetition: true,
  issuerAddress: '0xF2038DC163D650700ccC08626CB7a1044Ad3fddB',
  issuerId: '245',
  maxPrice: 4144.69,
  minPrice: 2425.88641009695,
  signalCloseDate: '2021-05-10T07:52:33.176Z',
  signalClosePrice: 4117.30744359526,
  signalID: '123',
  signalOpenDate: '2021-04-26T09:02:45.908Z',
  signalOpenPrice: 2441.52511726322,
  signalPerformance: -0.686367023006701,
  status: 'closed',
  stopLossPrice: null,
  symbol: 'ETH/USD',
  takeProfitPrice: 2172,
  username: 'eth_bear-san_system_bot',
};

const imagePath = 'image.png';
try {
  fs.unlinkSync(imagePath);
}
catch {}

createImage({
  forecast,
  imagePath,
}).then(
  () => console.log('done'), // eslint-disable-line no-console
);
