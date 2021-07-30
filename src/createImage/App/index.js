import {memo} from 'react';
import {number} from 'prop-types';
import {forbidExtraProps} from 'airbnb-prop-types';
import DesignSystem from './DesignSystem';
import ModalContent from './ModalContent';

export default memo(App);

App.propTypes = forbidExtraProps({
  bannerHeight: number.isRequired,
  contentMargin: number.isRequired,
  contentWidth: number.isRequired,
});

function App({
  bannerHeight,
  contentMargin,
  contentWidth,
}) {
  return (
    <html>
      <body>
        <DesignSystem/>
        <ModalContent
          bannerHeight={bannerHeight}
          contentMargin={contentMargin}
          contentWidth={contentWidth}
        />
      </body>
    </html>
  );
}
