const fs = require('fs'); // eslint-disable-line import/no-nodejs-modules
const path = require('path'); // eslint-disable-line import/no-nodejs-modules
const {createImage} = require('./createImage');

const forecast = {id: '41b4169d-8ba1-49bf-8fbe-059c084ed752', contractAddress: '0x67dE53f9c0c9cc99021B836BCea84eE80e61c734', signalID: '158', kovanSignalID: null, issuerId: '779b1256-4750-4aa0-9491-45612d4a26c2', issuerAddress: '0xf3F5d550c7280B2919C82B9188d6C3644fb1C3Ef', issuerUsername: 'the_very_long_pencil', symbol: 'BTC/USD', direction: 'up', status: 'closed', closePriceIndex: null, closeType: 'user_closed_signal', inCompetition: true, stopLossPrice: 0, takeProfitPrice: 0, openDate: '2022-03-23T11:16:38.000Z', closeDate: '2022-04-01T10:11:53.000Z', openPrice: 42113.28, closePrice: 45135.72, priceTimestamp: '1648807892', performance: 0.0717692851281117, performanceAbs: 0.0717692851281117, maxPrice: 48204.86, minPrice: 41907.66, image: 'uploads/generatedAutomatically/signalImages/41b4169d-8ba1-49bf-8fbe-059c084ed752_158_1648808044803.png', salt: '0xc981e801e3c284057c9febed35baccd06aa8754b8c03d675dfeafe551f8c07b2', issuer: {id: '779b1256-4750-4aa0-9491-45612d4a26c2', address: '0xf3F5d550c7280B2919C82B9188d6C3644fb1C3Ef', username: 'the_very_long_pencil', description: 'account for test purposes only', avatar: 'uploads/0xf3F5d550c7280B2919C82B9188d6C3644fb1C3Ef/1647526094883-avatar-File name', sumPerformanceClosed: 0.224566870192581, avgPerformanceClosed: 0.00976377696489484, geometricAvgPerformanceClosed: 0.00933212329578592, moClosed: 0.252570349645399, stakedAmount: 0, signalsAmount: 26, signalsAmountOpen: 3, signalsAmountClosed: 23, type: null, dailyNotificationsEnabled: true, storefrontEnabled: false, GDPR: '2021-12-18T10:59:09.330Z', createdAt: '2021-12-18T10:55:01.807Z'}};


const imagePath = 'image.png';
try {
  fs.unlinkSync(imagePath);
}
catch {}

createImage({
  forecast,
  imagePath,
}).then(res => console.log('done'));
