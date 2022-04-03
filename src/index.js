const fs = require('fs'); // eslint-disable-line import/no-nodejs-modules
const path = require('path'); // eslint-disable-line import/no-nodejs-modules
const {createImage} = require('./createImage');

const forecast = {"id":"e8b4713e-8d94-43ae-bb9c-bb1f2182c4be","contractAddress":"0x67dE53f9c0c9cc99021B836BCea84eE80e61c734","signalID":"211","kovanSignalID":null,"issuerId":"1b645389-2473-5467-9073-72d45eb05abc","issuerAddress":"0x5442feef7948775bDbc653D07eb9756d0Edddf47","issuerUsername":"san_swings","symbol":"AAVE/BTC","direction":null,"status":"open","closePriceIndex":null,"closeType":"user_closed_signal","inCompetition":true,"stopLossPrice":null,"takeProfitPrice":null,"openDate":"2022-04-01T13:32:30.000Z","closeDate":null,"openPrice":0.005276,"closePrice":0.005224,"priceTimestamp":"1649009149","performance":0.00985595147839271,"performanceAbs":0.00985595147839271,"maxPrice":0.005632,"minPrice":0.00508,"image":"uploads/generatedAutomatically/signalImages/e8b4713e-8d94-43ae-bb9c-bb1f2182c4be_211_1649009156659.png","salt":null,"issuer":{"id":"1b645389-2473-5467-9073-72d45eb05abc","address":"0x5442feef7948775bDbc653D07eb9756d0Edddf47","username":"san_swings","description":"Capturing the moves, based on the behaviour analyses. Aiming for 3-7 days","avatar":null,"sumPerformanceClosed":1.14974569537528,"avgPerformanceClosed":0.0166629810923954,"geometricAvgPerformanceClosed":0.0103027485635205,"moClosed":-0.38246719816952,"stakedAmount":45,"signalsAmount":71,"signalsAmountOpen":2,"signalsAmountClosed":69,"type":null,"dailyNotificationsEnabled":true,"storefrontEnabled":false,"GDPR":"2021-02-06T21:44:52.722Z","createdAt":"2020-07-16T09:31:42.754Z"}};


const imagePath = 'image.png';
try {
  fs.unlinkSync(imagePath);
}
catch {}

createImage({
  forecast,
  imagePath,
}).then(res => console.log('done'));
