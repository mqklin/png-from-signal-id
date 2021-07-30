import {memo} from 'react';
import {number} from 'prop-types';
import styled from 'styled-components';
import {semibold, alt} from 'App/DesignSystem';
import {forbidExtraProps} from 'airbnb-prop-types';


const Wr = styled.div`
  background: #fff;
  width: ${props => props.contentWidth}px;
  padding: 0 ${props => props.contentMargin}px;
  display: flex;
  flex-flow: column;
  position: relative;
`;

const ChartWr = styled.div`
`;

const Banner = styled.div`
  background: ${alt};
  color: #fff;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  ${semibold}
  font-family: Poppins, sans-serif;
  width: 100%;
  height: ${props => props.bannerHeight}px;
`;

const Icon = styled.img`
  width: ${26 * 2}px;
  height: ${26 * 2}px;
  margin-left: 32px;
`;

const Header = styled.div`
  font-size: ${19 * 2}px;
  margin-left: 24px;
`;

const Body = styled.div`
  font-size: ${14 * 2}px;
  margin-left: 24px;
  margin-top: 4px;
`;


export default memo(ModalContent);

ModalContent.propTypes = forbidExtraProps({
  bannerHeight: number.isRequired,
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
});

function ModalContent({
  bannerHeight,
  contentMargin,
  contentWidth,
}) {

  return (
    <Wr contentMargin={contentMargin} contentWidth={contentWidth}>
      <Banner bannerHeight={bannerHeight}>
        <Icon src={require('./icons/SAN.svg')}/>
        <Header>SanR</Header>
        <Body>Crypto price prediction marketplace</Body>
      </Banner>
      <ChartWr id="chart-wr"/>
    </Wr>
  );
}
