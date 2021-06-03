import {memo} from 'react';
import {string, func, any, object, bool} from 'prop-types';
import {forbidExtraProps} from 'airbnb-prop-types';
import styled from 'styled-components';


const Button = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  color: inherit;
  text-align: left;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  display: block;
  line-height: inherit;
  text-decoration: inherit;
  :disabled {
    cursor: default;
  }
`;


export default memo(ButtonContainer);

ButtonContainer.propTypes = forbidExtraProps({
  children: any,
  className: string, // need for styled-components (when `const MyButton = styled(ButtonContainer)...`)
  disabled: bool,
  onClick: func,
  onMouseEnter: func,
  onMouseLeave: func,
  style: object,
  type: string,
});

function ButtonContainer({
  children,
  className,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  type,
}) {
  return (
    <Button
      children={children}
      className={className}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      type={type}
    />
  );
}
