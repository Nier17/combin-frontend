import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  iconSVGLeft,
  iconSVGRight,
  onClickIcon,
  placeholder,
  readOnly,
  innerRef,
  hasError,
  ...rest
}) => (
  <InputWrapper hasError={hasError}>
    {iconSVGLeft && (
      <IconContainer
        hasOnClick={onClickIcon !== undefined}
        onClick={() => onClickIcon && onClickIcon()}
      >
        <Icon as={iconSVGLeft} />
      </IconContainer>
    )}
    <InputText
      ref={innerRef}
      placeholder={placeholder}
      disabled={readOnly}
      readOnly={readOnly}
      {...rest}
    />
    {iconSVGRight && (
      <IconContainer
        hasOnClick={onClickIcon !== undefined}
        onClick={() => onClickIcon && onClickIcon()}
      >
        <Icon as={iconSVGRight} />
      </IconContainer>
    )}
  </InputWrapper>
);

Input.defaultProps = {
  readOnly: false,
  iconSVGLeft: undefined,
  iconSVGRight: undefined,
  messageError: undefined,
  hasError: false,
  value: "",
  onClickIcon: undefined,
};

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  border-radius: 15px;
  box-sizing: border-box;

  transition: all 100ms;

  user-select: none;

  ${(props) => {
    if (props.hasError) {
      return css`
        border: 1px solid #f44336;
        :focus-within {
          border: 1px solid #f44336;
          box-shadow: 0 0 0 1px #f44336;
        }
      `;
    } else
      return css`
        border: 1px solid #cccccc;
        :focus-within {
          border: 1px solid #33c494;
          box-shadow: 0 0 0 1px #33c494;
        }
      `;
  }}
`;

const IconContainer = styled.div`
  background-color: #f3f3f4;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 15px;

  ${(props) =>
    props.hasOnClick &&
    css`
      cursor: pointer;
    `}
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;

  min-width: 20px;
  min-height: 20px;

  fill: #737373;
`;

const InputText = styled.input`
  flex: 1;
  outline: 0;
  border-width: 0;
  padding: 15px;
  box-sizing: border-box;
  min-width: 0;
  font-size: 1em;
  background-color: white;

  :disabled {
    background-color: #dbdbdb;
  }
`;

export default React.forwardRef((props, ref) => (
  <Input innerRef={ref} {...props} />
));
