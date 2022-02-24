import React from "react";
import styled, { css } from "styled-components";
import Spinner from "./Spinner";

const ButtonImage = ({
  iconSVG,
  type,
  isLoading,
  className,
  disabled,
  ...rest
}) => (
  <Container className={className}>
    <ButtonWrapper>
      <ButtonStyled
        className="button"
        type={type}
        loading={isLoading}
        disabled={isLoading || disabled}
        {...rest}
      >
        {iconSVG && <IconSVG as={iconSVG} />}
      </ButtonStyled>
      {isLoading && <SpinnerStyled />}
    </ButtonWrapper>
  </Container>
);

ButtonImage.defaultProps = {
  type: "primary",
};

const Container = styled.div`
  user-select: none;

  width: 46px;
  height: 46px;
  min-width: 46px;
  min-height: 46px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const IconSVG = styled.div`
  width: 16px;
  height: 16px;

  min-width: 16px;
  min-height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 15px;

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

        ${IconSVG} {
          fill: white;
        }
      `;
    else if (props.type === "secondary")
      return css`
        background-color: white;
        border: 1px solid #33c494;

        ${IconSVG} {
          fill: #33c494;
        }
      `;
    else if (props.type === "tertiary")
      return css`
        background-color: #eaf9f4;

        ${IconSVG} {
          fill: #33c494;
        }
      `;
    else if (props.type === "quartary")
      return css`
        background-color: rgba(0, 0, 0, 0.1);

        ${IconSVG} {
          fill: white;
        }
      `;
    else if (props.type === "information-primary")
      return css`
        background-color: #2cadd1;

        ${IconSVG} {
          fill: white;
        }
      `;
    else if (props.type === "information-secondary")
      return css`
        background-color: white;
        border: 1px solid #2cadd1;

        ${IconSVG} {
          fill: #2cadd1;
        }
      `;
    else if (props.type === "information-tertiary")
      return css`
        background-color: #deecf1;

        ${IconSVG} {
          fill: #2cadd1;
        }
      `;
    else if (props.type === "error-primary")
      return css`
        background-color: #f44336;

        ${IconSVG} {
          fill: white;
        }
      `;
    else if (props.type === "error-secondary")
      return css`
        background-color: white;
        border: 1px solid #f44336;

        ${IconSVG} {
          fill: #f44336;
        }
      `;
    else if (props.type === "error-tertiary")
      return css`
        background-color: #fbe5e5;

        ${IconSVG} {
          fill: #f44336;
        }
      `;
  }}

  ${(props) =>
    (props.loading || props.disabled) &&
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

export default ButtonImage;
