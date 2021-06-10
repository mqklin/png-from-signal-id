import {memo} from 'react';
import {number} from 'prop-types';
import {forbidExtraProps} from 'airbnb-prop-types';
import DesignSystem from './DesignSystem';
import ModalContent from './ModalContent';

export default memo(App);

App.propTypes = forbidExtraProps({
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
});

function App({
  contentMargin,
  contentWidth,
}) {
  return (
    <html>
      <body>
        <DesignSystem/>
        <ModalContent
          contentMargin={contentMargin}
          contentWidth={contentWidth}
        />
      </body>
    </html>
  );
}
