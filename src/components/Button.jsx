import React, { useImperativeHandle, useRef } from "react";
import styled, { css } from "styled-components";
import Spinner from "./Spinner";

const Button = ({
  text,
  iconSVGLeft,
  type,
  isLoading,
  className,
  disabled,
  innerRef,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef();

  useImperativeHandle(innerRef, () => ({
    click: () => {
      buttonRef.current.click();
    },
  }));

  return (
    <Container className={className}>
      <ButtonWrapper>
        <ButtonStyled
          ref={buttonRef}
          onClick={onClick}
          className="button"
          type={type}
          isLoading={isLoading}
          disabled={isLoading || disabled}
          {...rest}
        >
          {iconSVGLeft && <IconSVGLeft as={iconSVGLeft} />}
          {text && <Label>{text}</Label>}
        </ButtonStyled>
        {isLoading && <SpinnerStyled />}
      </ButtonWrapper>
    </Container>
  );
};

Button.defaultProps = {
  type: "primary",
};

const Container = styled.div`
  user-select: none;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Label = styled.div`
  text-align: center;
`;

const IconSVGLeft = styled.div`
  width: 16px;
  height: 16px;

  min-width: 16px;
  min-height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 5px 5px 0px;

  & ~ ${Label} {
    margin-left: 5px;
  }
`;

const ButtonStyled = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 15px;
  font-weight: 600;
  width: 100%;
  min-height: 42px;
  font-size: 1em;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  ${(props) => {
    if (props.type === "primary")
      return css`
        background-color: #33c494;
        color: white;

        ${IconSVGLeft} {
          fill: white;
        }
      `;
    else if (props.type === "secondary")
      return css`
        background-color: white;
        color: #33c494;
        border: 1px solid #33c494;

        ${IconSVGLeft} {
          fill: #33c494;
        }
      `;
    else if (props.type === "tertiary")
      return css`
        background-color: #eaf9f4;
        color: #33c494;

        ${IconSVGLeft} {
          fill: #33c494;
        }
      `;
    else if (props.type === "quartary")
      return css`
        color: #33c494;

        ${IconSVGLeft} {
          fill: #33c494;
        }
      `;
    else if (props.type === "information-primary")
      return css`
        background-color: #2cadd1;
        color: white;

        ${IconSVGLeft} {
          fill: white;
        }
      `;
    else if (props.type === "information-secondary")
      return css`
        background-color: white;
        color: #2cadd1;
        border: 1px solid #2cadd1;

        ${IconSVGLeft} {
          fill: #2cadd1;
        }
      `;
    else if (props.type === "information-tertiary")
      return css`
        background-color: #deecf1;
        color: #2cadd1;

        ${IconSVGLeft} {
          fill: #2cadd1;
        }
      `;
    else if (props.type === "error-primary")
      return css`
        background-color: #f44336;
        color: white;

        ${IconSVGLeft} {
          fill: white;
        }
      `;
    else if (props.type === "error-secondary")
      return css`
        background-color: white;
        color: #f44336;
        border: 1px solid #f44336;

        ${IconSVGLeft} {
          fill: #f44336;
        }
      `;
    else if (props.type === "error-tertiary")
      return css`
        background-color: #fbe5e5;
        color: #f44336;

        ${IconSVGLeft} {
          fill: #f44336;
        }
      `;
  }}

  ${(props) =>
    (props.isLoading || props.disabled) &&
    css`
      cursor: not-allowed;
      opacity: 0.2;
    `}
`;

const SpinnerStyled = styled(Spinner)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  margin: auto;
  cursor: not-allowed;
`;

export default React.forwardRef((props, ref) => (
  <Button innerRef={ref} {...props} />
));
