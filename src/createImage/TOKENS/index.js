const AAVE = 'AAVE';
const ADA = 'ADA';
const AMPL = 'AMPL';
const BADGER = 'BADGER';
const BAL = 'BAL';
const BAND = 'BAND';
const BAT = 'BAT';
const BNB = 'BNB';
const BNT = 'BNT';
const BTC = 'BTC';
const COMP = 'COMP';
const CRV = 'CRV';
const DCR = 'DCR';
const DODO = 'DODO';
const DOT = 'DOT';
const ENJ = 'ENJ';
const ETH = 'ETH';
const ETH_BTC = 'ETH_BTC';
const INCH = 'INCH';
const KAVA = 'KAVA';
const KNC = 'KNC';
const LEND = 'LEND';
const LINK = 'LINK';
const LRC = 'LRC';
const MFT = 'MFT';
const MKR = 'MKR';
const OMG = 'OMG';
const ORN = 'ORN';
const REN = 'REN';
const REP = 'REP';
const SNX = 'SNX';
const SUSHI = 'SUSHI';
const UNI = 'UNI';
const YFI = 'YFI';
const ZRX = 'ZRX';
const FTT = 'FTT';
const SOL = 'SOL';
const DOGE = 'DOGE';
const MATIC = 'MATIC';
const XRP = 'XRP';
const DYDX = 'DYDX';
const LTC = 'LTC';
const LUNA = 'LUNA';
const CREAM = 'CREAM';
const GALA = 'GALA';
const SANDBOX = 'SANDBOX';
const AXIE = 'AXIE';
const LOOKS = 'LOOKS';
const WAX = 'WAX';
const MC = 'MC';

const TOKENS = [
  {
    id: BTC,
    symbol: 'BTC/USD',

    slug: 'bitcoin',
    metric: 'price_usd',
  },
  {
    id: ETH,
    symbol: 'ETH/USD',

    slug: 'ethereum',
    metric: 'price_usd',
  },
  {
    id: ADA,
    symbol: 'ADA/BTC',

    slug: 'cardano',
    metric: 'price_btc',
  },
  {
    id: BADGER,
    symbol: 'BADGER/BTC',

    slug: 'badger-dao',
    metric: 'price_btc',
  },
  {
    id: BNT,
    symbol: 'BNT/BTC',

    slug: 'bancor',
    metric: 'price_btc',
  },
  {
    id: UNI,
    symbol: 'UNI/BTC',

    slug: 'uniswap',
    metric: 'price_btc',
  },
  {
    id: YFI,
    symbol: 'YFI/BTC',

    slug: 'yearn-finance',
    metric: 'price_btc',
  },
  {
    id: LINK,
    symbol: 'LINK/BTC',

    slug: 'chainlink',
    metric: 'price_btc',
  },
  {
    id: MKR,
    symbol: 'MKR/BTC',

    slug: 'maker',
    metric: 'price_btc',
  },
  {
    id: BAT,
    symbol: 'BAT/BTC',
    value: 'BAT/BTC',

    slug: 'basic-attention-token',
    metric: 'price_btc',
  },
  {
    id: AAVE,
    symbol: 'AAVE/BTC',

    slug: 'aave',
    metric: 'price_btc',
  },
  {
    id: LEND,
    symbol: 'LEND/BTC',

    slug: 'aave',
    metric: 'price_btc',
  },
  {
    id: COMP,
    symbol: 'COMP/BTC',

    slug: 'compound',
    metric: 'price_btc',
  },
  {
    id: SNX,
    symbol: 'SNX/BTC',

    slug: 'synthetix-network-token',
    metric: 'price_btc',
  },
  {
    id: AMPL,
    symbol: 'AMPL/BTC',

    slug: 'ampleforth',
    metric: 'price_btc',
  },
  {
    id: BAL,
    symbol: 'BAL/BTC',

    slug: 'balancer',
    metric: 'price_btc',
  },
  {
    id: KNC,
    symbol: 'KNC/BTC',

    slug: 'kyber-network',
    metric: 'price_btc',
  },
  {
    id: REN,
    symbol: 'REN/BTC',

    slug: 'ren',
    metric: 'price_btc',
  },
  {
    id: KAVA,
    symbol: 'KAVA/BTC',

    slug: 'kava',
    metric: 'price_btc',
  },
  {
    id: BAND,
    symbol: 'BAND/BTC',

    slug: 'band-protocol',
    metric: 'price_btc',
  },
  {
    id: DCR,
    symbol: 'DCR/BTC',

    slug: 'decred',
    metric: 'price_btc',
  },
  {
    id: MFT,
    symbol: 'MFT/BTC',

    slug: 'mainframe',
    metric: 'price_btc',
  },
  {
    id: BNB,
    symbol: 'BNB/BTC',

    slug: 'binance-coin',
    metric: 'price_btc',
  },
  {
    id: REP,
    symbol: 'REP/BTC',

    slug: 'augur',
    metric: 'price_btc',
  },
  {
    id: OMG,
    symbol: 'OMG/BTC',

    slug: 'omisego',
    metric: 'price_btc',
  },
  {
    id: ETH_BTC,
    symbol: 'ETH/BTC',

    slug: 'ethereum',
    metric: 'price_btc',
  },
  {
    id: LRC,
    symbol: 'LRC/BTC',

    slug: 'loopring',
    metric: 'price_btc',
  },
  {
    id: ENJ,
    symbol: 'ENJ/BTC',

    slug: 'enjin-coin',
    metric: 'price_btc',
  },
  {
    id: ZRX,
    symbol: 'ZRX/BTC',

    slug: '0x',
    metric: 'price_btc',
  },
  {
    id: CRV,
    symbol: 'CRV/BTC',

    slug: 'curve',
    metric: 'price_btc',
  },
  {
    id: ORN,
    symbol: 'ORN/BTC',

    slug: 'orion-protocol',
    metric: 'price_btc',
  },
  {
    id: DOT,
    symbol: 'DOT/BTC',

    slug: 'polkadot-new',
    metric: 'price_btc',
  },
  {
    id: SUSHI,
    symbol: 'SUSHI/BTC',

    slug: 'sushi',
    metric: 'price_btc',
  },
  {
    id: DODO,
    symbol: 'DODO/BTC',

    slug: 'dodo',
    metric: 'price_btc',
  },
  {
    id: INCH,
    symbol: '1INCH/BTC',

    slug: '1inch',
    metric: 'price_btc',
  },
  {
    id: FTT,
    symbol: 'FTT/BTC',

    slug: 'ftx-token',
    metric: 'price_btc',
  },
  {
    id: SOL,
    symbol: 'SOL/BTC',

    slug: 'solana',
    metric: 'price_btc',
  },
  {
    id: DOGE,
    symbol: 'DOGE/BTC',

    slug: 'dogecoin',
    metric: 'price_btc',
  },
  {
    id: MATIC,
    symbol: 'MATIC/BTC',

    slug: 'matic-network',
    metric: 'price_btc',
  },
  {
    id: XRP,
    symbol: 'XRP/BTC',

    slug: 'ripple',
    metric: 'price_btc',
  },
  {
    id: DYDX,
    symbol: 'DYDX/BTC',

    slug: 'dydx',
    metric: 'price_btc',
  },
  {
    id: LTC,
    symbol: 'LTC/BTC',

    slug: 'litecoin',
    metric: 'price_btc',
  },
  {
    id: LUNA,
    symbol: 'LUNA/BTC',

    slug: 'luna',
    metric: 'price_btc',
  },
  {
    id: CREAM,
    symbol: 'CREAM/BTC',

    slug: 'cream-finance',
    metric: 'price_btc',
  },
  {
    id: GALA,
    symbol: 'GALA/BTC',

    slug: 'gala',
    metric: 'price_btc',
  },
  {
    id: SANDBOX,
    symbol: 'SAND/BTC',

    slug: 'the-sandbox',
    metric: 'price_btc',
  },
  {
    id: AXIE,
    symbol: 'AXS/BTC',

    slug: 'axie-infinity',
    metric: 'price_btc',
  },
  {
    id: WAX,
    symbol: 'WAXP/BTC',

    slug: 'wax',
    metric: 'price_btc',
  },
  {
    id: LOOKS,
    symbol: 'LOOKS/ETH',

    slug: 'looksrare',
    metric: 'price_eth',
  },
  {
    id: MC,
    symbol: 'MC/BTC',

    slug: 'merit-circle',
    metric: 'price_btc',
  },
];

exports.TOKENS = TOKENS;
