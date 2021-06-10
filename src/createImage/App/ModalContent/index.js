import {memo} from 'react';
import {number} from 'prop-types';
import styled from 'styled-components';
import {semibold, gray90} from 'App/DesignSystem';
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

const Icon = styled.img`
  position: absolute;
  width: ${59 * 2}px;
  height: ${59 * 2}px;
  right: ${24 * 2}px;
  top: ${28 * 2}px;
  z-index: 1;
`;

const Text = styled.div`
  top: ${28 * 2}px;
  left: ${28 * 2}px;
  position: absolute;
  z-index: 1;
  color: ${gray90};
  letter-spacing: 0.4px;
`;

const Header = styled.div`
  font-size: ${35 * 2}px;
  font-family: Poppins, sans-serif;
  ${semibold}
`;

const Body = styled.div`
  font-size: ${20 * 2}px;
  font-family: Poppins, sans-serif;
  ${semibold}
`;


export default memo(ModalContent);

ModalContent.propTypes = forbidExtraProps({
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
});

function ModalContent({
  contentMargin,
  contentWidth,
}) {

  return (
    <Wr contentMargin={contentMargin} contentWidth={contentWidth}>
      <ChartWr id="chart-wr"/>
      <Icon src={require('./icons/SAN.svg')}/>
      <Text>
        <Header>SanR</Header>
        <Body>Crypto price prediction marketplace</Body>
      </Text>
    </Wr>
  );
}
