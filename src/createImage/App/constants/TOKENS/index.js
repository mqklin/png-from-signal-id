import aave from './icons/aave.png';
import lend from './icons/lend.png';
import ampleforth from './icons/logo64_ampleforth.png';
import augur from './icons/logo64_augur.png';
import balancer from './icons/logo64_balancer.png';
import band from './icons/band.png';
import bat from './icons/bat.png';
import bnb from './icons/bnb.png';
import btc from './icons/btc.svg';
import cardano from './icons/logo64_cardano.png';
import compound from './icons/logo64_compound.png';
import decred from './icons/logo64_decred.png';
import eth from './icons/eth.svg';
import kava from './icons/kava.png';
import knc from './icons/knc.png';
import link from './icons/logo64_chainlink.png';
import mainframe from './icons/logo64_mainframe.png';
import maker from './icons/logo64_maker.png';
import omg from './icons/logo64_omg.png';
import ren from './icons/ren.png';
import synthetix from './icons/synthetix.png';
import uniswap from './icons/uniswap.png';
import yfi from './icons/yfi.png';

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

const TOKENS = [
  {
    id: BTC,
    symbol: 'BTC/USD',
    icon: btc,
    slug: 'bitcoin',
    metric: 'price_usd',
  },
  {
    id: ETH,
    symbol: 'ETH/USD',
    icon: eth,
    slug: 'ethereum',
    metric: 'price_usd',
  },
  {
    id: ADA,
    symbol: 'ADA/BTC',
    icon: cardano,
    slug: 'cardano',
    metric: 'price_btc',
  },
  {
    id: BADGER,
    symbol: 'BADGER/BTC',
    icon: require('./icons/badger.png'),
    slug: 'badger-dao',
    metric: 'price_btc',
  },
  {
    id: BNT,
    symbol: 'BNT/BTC',
    icon: require('./icons/bnt.png'),
    slug: 'bancor',
    metric: 'price_btc',
  },
  {
    id: UNI,
    symbol: 'UNI/BTC',
    icon: uniswap,
    slug: 'uniswap',
    metric: 'price_btc',
  },
  {
    id: YFI,
    symbol: 'YFI/BTC',
    icon: yfi,
    slug: 'yearn-finance',
    metric: 'price_btc',
  },
  {
    id: LINK,
    symbol: 'LINK/BTC',
    icon: link,
    slug: 'chainlink',
    metric: 'price_btc',
  },
  {
    id: MKR,
    symbol: 'MKR/BTC',
    icon: maker,
    slug: 'maker',
    metric: 'price_btc',
  },
  {
    id: BAT,
    symbol: 'BAT/BTC',
    value: 'BAT/BTC',
    icon: bat,
    slug: 'basic-attention-token',
    metric: 'price_btc',
  },
  {
    id: AAVE,
    symbol: 'AAVE/BTC',
    icon: aave,
    slug: 'aave',
    metric: 'price_btc',
  },
  {
    id: LEND,
    symbol: 'LEND/BTC',
    icon: lend,
    slug: 'aave',
    metric: 'price_btc',
  },
  {
    id: COMP,
    symbol: 'COMP/BTC',
    icon: compound,
    slug: 'compound',
    metric: 'price_btc',
  },
  {
    id: SNX,
    symbol: 'SNX/BTC',
    icon: synthetix,
    slug: 'synthetix-network-token',
    metric: 'price_btc',
  },
  {
    id: AMPL,
    symbol: 'AMPL/BTC',
    icon: ampleforth,
    slug: 'ampleforth',
    metric: 'price_btc',
  },
  {
    id: BAL,
    symbol: 'BAL/BTC',
    icon: balancer,
    slug: 'balancer',
    metric: 'price_btc',
  },
  {
    id: KNC,
    symbol: 'KNC/BTC',
    icon: knc,
    slug: 'kyber-network',
    metric: 'price_btc',
  },
  {
    id: REN,
    symbol: 'REN/BTC',
    icon: ren,
    slug: 'ren',
    metric: 'price_btc',
  },
  {
    id: KAVA,
    symbol: 'KAVA/BTC',
    icon: kava,
    slug: 'kava',
    metric: 'price_btc',
  },
  {
    id: BAND,
    symbol: 'BAND/BTC',
    icon: band,
    slug: 'band-protocol',
    metric: 'price_btc',
  },
  {
    id: DCR,
    symbol: 'DCR/BTC',
    icon: decred,
    slug: 'decred',
    metric: 'price_btc',
  },
  {
    id: MFT,
    symbol: 'MFT/BTC',
    icon: mainframe,
    slug: 'mainframe',
    metric: 'price_btc',
  },
  {
    id: BNB,
    symbol: 'BNB/BTC',
    icon: bnb,
    slug: 'binance-coin',
    metric: 'price_btc',
  },
  {
    id: REP,
    symbol: 'REP/BTC',
    icon: augur,
    slug: 'augur',
    metric: 'price_btc',
  },
  {
    id: OMG,
    symbol: 'OMG/BTC',
    icon: omg,
    slug: 'omisego',
    metric: 'price_btc',
  },
  {
    id: ETH_BTC,
    symbol: 'ETH/BTC',
    icon: eth,
    slug: 'ethereum',
    metric: 'price_btc',
  },
  {
    id: LRC,
    symbol: 'LRC/BTC',
    icon: require('./icons/lrc.png'),
    slug: 'loopring',
    metric: 'price_btc',
  },
  {
    id: ENJ,
    symbol: 'ENJ/BTC',
    icon: require('./icons/enj.png'),
    slug: 'enjin-coin',
    metric: 'price_btc',
  },
  {
    id: ZRX,
    symbol: 'ZRX/BTC',
    icon: require('./icons/0x.png'),
    slug: '0x',
    metric: 'price_btc',
  },
  {
    id: CRV,
    symbol: 'CRV/BTC',
    icon: require('./icons/crv.png'),
    slug: 'curve',
    metric: 'price_btc',
  },
  {
    id: ORN,
    symbol: 'ORN/BTC',
    icon: require('./icons/orn.png'),
    slug: 'orion-protocol',
    metric: 'price_btc',
  },
  {
    id: DOT,
    symbol: 'DOT/BTC',
    icon: require('./icons/dot.png'),
    slug: 'polkadot-new',
    metric: 'price_btc',
  },
  {
    id: SUSHI,
    symbol: 'SUSHI/BTC',
    icon: require('./icons/sushi.png'),
    slug: 'sushi',
    metric: 'price_btc',
  },
  {
    id: DODO,
    symbol: 'DODO/BTC',
    icon: require('./icons/dodo.png'),
    slug: 'dodo',
    metric: 'price_btc',
  },
  {
    id: INCH,
    symbol: '1INCH/BTC',
    icon: require('./icons/1inch.png'),
    slug: '1inch',
    metric: 'price_btc',
  },
];

export default TOKENS;

export const deprecatedTokens = [LEND, ETH_BTC, MFT, AMPL, BAT, DCR, KAVA, OMG];
export const majors = [BTC, ETH];
export const contenders = [ADA, BNB, DOT];
export const defiPack = TOKENS.map(t => t.id).filter(id => !deprecatedTokens.includes(id) && !majors.includes(id) && !contenders.includes(id));
