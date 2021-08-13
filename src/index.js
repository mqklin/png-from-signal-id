const fs = require('fs'); // eslint-disable-line import/no-nodejs-modules
const {createImage, getPrices} = require('../build/index.js');

const forecast = {
  closeType: 'user_closed_signal',
  direction: 'down',
  id: '56264',
  image: 'uploads/generatedAutomatically/signalImages/56264_821_1628849429030.png',
  inCompetition: true,
  issuerAddress: '0x56714f0d5aBc4f9a5fEA7cc84C4f8F12eefB954b',
  issuerId: '599',
  maxPrice: 0.0007448,
  minPrice: 0.0002904,
  signalCloseDate: '2021-08-13T10:10:25.293Z',
  signalClosePrice: 0.0006001,
  signalID: '821',
  signalOpenDate: '2021-08-03T13:06:05.621Z',
  signalOpenPrice: 0.000305,
  signalPerformance: -0.967540983606557,
  status: 'closed',
  stopLossPrice: null,
  symbol: 'BADGER/BTC',
  takeProfitPrice: 0.000273,
  username: 'traveler_3468',
};

const imagePath = 'image.png';
try {
  fs.unlinkSync(imagePath);
}
catch {}

getPrices(forecast).then(prices => {
  createImage({
    forecast,
    imagePath,
    prices,
  }).then(() => console.log('done')); // eslint-disable-line no-console
});
