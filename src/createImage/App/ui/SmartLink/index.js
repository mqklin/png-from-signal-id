import {memo} from 'react';
import styled from 'styled-components';
import {string, any, func, oneOfType, object} from 'prop-types';
import {forbidExtraProps} from 'airbnb-prop-types';

const A = styled.a`
  display: block;
  width: auto;
  text-decoration: none;
  color: inherit;
`;

export default memo(SmartLink);

SmartLink.propTypes = forbidExtraProps({
  children: any,
  className: string, // need for styled-components (when `const MyLink = styled(SmartLink)...`)
  onClick: func,
  to: oneOfType([object, string]).isRequired,
});

function SmartLink({
  children,
  className,
  onClick,
  to,
}) {

  return (
    <A
      children={children}
      className={className}
      href={to}
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
    />
  );
}
