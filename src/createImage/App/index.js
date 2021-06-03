import {memo} from 'react';
import {number, object, string} from 'prop-types';
import {forbidExtraProps} from 'airbnb-prop-types';
import DesignSystem from './DesignSystem';
import ModalContent from './ModalContent';

export default memo(App);

App.propTypes = forbidExtraProps({
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
  forecast: object.isRequired,
  signalsContractAddress: string.isRequired,
});

function App({
  contentMargin,
  contentWidth,
  forecast,
  signalsContractAddress,
}) {
  return (
    <html>
      <body>
        <DesignSystem/>
        <ModalContent
          contentMargin={contentMargin}
          contentWidth={contentWidth}
          forecast={forecast}
          signalsContractAddress={signalsContractAddress}
        />
      </body>
    </html>
  );
}
