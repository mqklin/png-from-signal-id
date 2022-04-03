export const AAVE = 'AAVE';
export const ADA = 'ADA';
export const AMPL = 'AMPL';
export const BADGER = 'BADGER';
export const BAL = 'BAL';
export const BAND = 'BAND';
export const BAT = 'BAT';
export const BNB = 'BNB';
export const BNT = 'BNT';
export const BTC = 'BTC';
export const COMP = 'COMP';
export const CRV = 'CRV';
export const DCR = 'DCR';
export const DODO = 'DODO';
export const DOT = 'DOT';
export const ENJ = 'ENJ';
export const ETH = 'ETH';
export const ETH_BTC = 'ETH_BTC';
export const INCH = 'INCH';
export const KAVA = 'KAVA';
export const KNC = 'KNC';
export const LEND = 'LEND';
export const LINK = 'LINK';
export const LRC = 'LRC';
export const MFT = 'MFT';
export const MKR = 'MKR';
export const OMG = 'OMG';
export const ORN = 'ORN';
export const REN = 'REN';
export const REP = 'REP';
export const SNX = 'SNX';
export const SUSHI = 'SUSHI';
export const UNI = 'UNI';
export const YFI = 'YFI';
export const ZRX = 'ZRX';
export const ZKS = 'ZKS';
export const FTT = 'FTT';
export const SOL = 'SOL';
export const DOGE = 'DOGE';
export const MATIC = 'MATIC';
export const XRP = 'XRP';
export const DYDX = 'DYDX';
export const LTC = 'LTC';
export const LUNA = 'LUNA';
export const CREAM = 'CREAM';
export const GALA = 'GALA';
export const SANDBOX = 'SANDBOX';
export const AXIE = 'AXIE';
export const LOOKS = 'LOOKS';
export const WAX = 'WAX';
export const MC = 'MC';

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

export default TOKENS;

export const deprecatedTokens = [LEND, MFT, AMPL, BAT, DCR, KAVA, OMG];
export const majors = [BTC, ETH, ETH_BTC];
export const metaverse = [GALA, SANDBOX, AXIE, MC];
export const contenders = [ADA, BNB, DOT, SOL, MATIC, DOGE, XRP, LTC, LUNA];
export const nft = [WAX, LOOKS];
export const defiPack = TOKENS.map(t => t.id).filter(id => !deprecatedTokens.includes(id) && !majors.includes(id) && !contenders.includes(id) && !metaverse.includes(id) && !nft.includes(id));
