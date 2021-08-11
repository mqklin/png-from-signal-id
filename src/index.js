const fs = require('fs'); // eslint-disable-line import/no-nodejs-modules
const {createImage} = require('../build/index.js');

const forecast = {
  closeType: 'user_closed_signal',
  direction: 'down',
  id: '56418',
  image: 'uploads/generatedAutomatically/signalImages/56418_855_1628698987886.png',
  inCompetition: true,
  issuerAddress: '0xd3207412bDA3d8B3F9D8a0Cb454318DCcaa7F0e5',
  issuerId: '95',
  maxPrice: 3252.26219731997,
  minPrice: 3252,
  signalCloseDate: null,
  signalClosePrice: 3252,
  signalID: '855',
  signalOpenDate: '2021-08-11T16:22:51.863Z',
  signalOpenPrice: 3252.26219731997,
  signalPerformance: 0.0000806199820499911,
  status: 'open',
  stopLossPrice: null,
  symbol: 'ETH/USD',
  takeProfitPrice: null,
  username: 'u_0xd32.7f0e5',
};

const imagePath = 'image.png';
try {
  fs.unlinkSync(imagePath);
}
catch {}

createImage({
  forecast,
  imagePath,
}).then(() => console.log('done')); // eslint-disable-line no-console
