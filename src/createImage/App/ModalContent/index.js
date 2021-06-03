import {memo} from 'react';
import {number, string, object} from 'prop-types';
import styled, {css} from 'styled-components';
import {regular, h3a, bold, gray0, gray5, primary, primaryLt, secondary, secondaryLt, gray20, bodyMd, bodyLg, gray90, caption, bodySm} from 'App/DesignSystem';
import {forbidExtraProps} from 'airbnb-prop-types';
import {roundTokenValue, mathRound2} from 'App/utils';
import {SmartLink, ButtonContainer} from 'App/ui';
import moment from 'moment';
import TOKENS from 'App/constants/TOKENS';
import arrowGreenUp from './icons/green-up.svg';
import arrowRedDown from './icons/red-down.svg';


const Wr = styled.div`
  background: #fff;
  width: ${props => props.contentWidth}px;
  padding: 40px ${props => props.contentMargin}px 16px;
  display: flex;
  flex-flow: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIconText = styled.div`
  ${h3a}
  ${bold}
  color: ${gray90};
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

const HeaderDate = styled.div`
  margin-left: auto;
  ${bodyMd}
  color: ${gray20};
  display: flex;
  align-items: center;
  img {
    margin-left: 8px;
  }
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  ${bodyMd}
  color: ${gray20};
  margin-left: 20px;
`;

const HeadeStatusNft = styled.div`
  margin-left: 24px;
  display: flex;
  align-items: center;
`;

const HeaderStatus = styled.div`
  color: ${gray90};
  ${bold}
  ${bodyLg}
`;

const HeaderNft = styled.div`
  margin-left: 20px;
`;

const NftLink = styled(SmartLink)`
  ${caption}
  color: ${gray20};
  text-decoration: underline;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background-image: url(${require('./sparkles.svg')});
    background-size: cover;
    margin-right: 4px;
  }
`;

const Block = styled.div`
`;

const Info = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-left: -44px;
  margin-top: -16px;
`;

const Value = styled.div`
  ${bodySm}
  ${bold}
  color: ${gray90};
  display: flex;
  align-items: center;
`;

const InfoBlock = styled.div`
  margin-left: 44px;
  margin-top: 24px;
  ${props => props.mlAuto && css`
    margin-left: auto;
    ${Value} {
      justify-content: flex-end;
    }
  `}
`;

const Label = styled.div`
  ${caption}
  color: ${gray20};
`;


const UserLink = styled(SmartLink)`
  text-decoration: underline;
`;

const SignalDirectLinkWr = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20px;
`;

const SignalDirectLinkText = styled.div`
  ${caption}
  color: ${gray90};
  background: ${gray5};
  ${regular}
  height: 28px;
  display: flex;
  align-items: center;
  border: 1px solid ${gray0};
  border-radius: 6px;
  border-right-width: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 12px;
`;

const SignalDirectLinkIcon = styled(ButtonContainer)`
  width: 42px;
  height: 28px;
  position: relative;
  background: ${gray5};
  border: 1px solid ${gray0};
  &:hover {
    border-color: ${gray20};
  }
  &:active {
    border-color: ${gray90};
  }
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background-image: url(${require('./copy.svg')});
    background-size: cover;
  }
`;

const Performance = styled.span`
  padding: 1px 4px;
  background: ${props => props.positive ? primaryLt : props.negative ? secondaryLt : ''};
  color: ${props => props.positive ? primary : props.negative ? secondary : ''};
`;

const ChartWr = styled.div`
  margin-top: 16px;
  padding-top: 24px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -0;
    left: -9999px;
    right: -9999px;
    background: ${gray0};
    height: 1px;
  }
`;


export default memo(ModalContent);

ModalContent.propTypes = forbidExtraProps({
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
  forecast: object.isRequired,
  signalsContractAddress: string.isRequired,
});

function ModalContent({
  contentMargin,
  contentWidth,
  forecast,
  signalsContractAddress,
}) {

  const {signalID} = forecast;

  const {
    symbol,
    direction,
    signalOpenDate,
    signalCloseDate,
    signalOpenPrice,
    signalClosePrice,
    signalPerformance,
    username,
    takeProfitPrice,
    stopLossPrice,
  } = forecast;

  return (
    <Wr contentMargin={contentMargin} contentWidth={contentWidth}>
      <Header>
        <HeaderIconText>
          <img src={TOKENS.find(t => t.symbol === symbol)?.icon}/>{symbol}
        </HeaderIconText>
        {signalID &&
          <SignalDirectLinkWr>
            <SignalDirectLinkText>https://sanr.santiment.net/signals/{signalID}</SignalDirectLinkText>
            <SignalDirectLinkIcon/>
          </SignalDirectLinkWr>
        }
        <HeaderDate>
          {formatDate(signalOpenDate)}{signalCloseDate && ` - ${formatDate(signalCloseDate)}`} <img src={direction === 'down' ? arrowRedDown : arrowGreenUp}/>
        </HeaderDate>
        {username &&
          <HeaderUser>
            <UserLink to={`/user/${username}`}>{username}</UserLink>
          </HeaderUser>
        }
        <HeadeStatusNft>
          <HeaderStatus>{signalCloseDate ? 'CLOSED' : 'OPEN'}</HeaderStatus>
          {signalID &&
            <HeaderNft>
              <NftLink to={`https://kovan.etherscan.io/token/${signalsContractAddress}?a=${signalID}#readContract`}>Signal NFT</NftLink>
            </HeaderNft>
          }
        </HeadeStatusNft>
      </Header>
      <Block>
        <Info>
          <InfoBlock>
            <Label>Opening Price</Label>
            <Value>{roundTokenValue(signalOpenPrice, symbol)}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>{!signalCloseDate ? 'Current' : 'Closing'} Price</Label>
            <Value>{roundTokenValue(signalClosePrice, symbol)}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Target</Label>
            <Value>
              {takeProfitPrice !== null ? roundTokenValue(takeProfitPrice, symbol) : <>&ndash;</>}
            </Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Stop Loss</Label>
            <Value>
              {stopLossPrice !== null ? roundTokenValue(stopLossPrice, symbol) : <>&ndash;</>}
            </Value>
          </InfoBlock>
          <InfoBlock mlAuto>
            <Label>Performance</Label>
            <Value><Performance negative={signalPerformance < 0} positive={signalPerformance > 0}>{mathRound2(signalPerformance * 100)}%</Performance></Value>
          </InfoBlock>
        </Info>
        <ChartWr id="chart-wr"/>
      </Block>
    </Wr>
  );
}


function formatDate(date) {
  return moment(date).format('MMM DD ‘YY');
}
