import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as InformationSVG } from "../assets/info.svg";
import { ReactComponent as NotificationSVG } from "../assets/bell.svg";
import { ReactComponent as ErrorSVG } from "../assets/exclamation-mark.svg";

import Button from "./Button";

const iconTypes = {
  information: InformationSVG,
  notification: NotificationSVG,
  error: ErrorSVG,
};

const NotificationBox = ({ type, text, buttonText, buttons, onClick }) => {
  return (
    <Container type={type}>
      <IconContainer type={type}>
        <Icon type={type} as={iconTypes[type]} />
      </IconContainer>
      <Children>{text}</Children>
      {buttons ? (
        <WrapperButtons>{buttons}</WrapperButtons>
      ) : (
        <>
          {(type === "information" || type === "notification") && (
            <NotificationButton
              type="information-tertiary"
              text={buttonText}
              onClick={onClick}
            />
          )}
          {type === "error" && (
            <NotificationButton
              type="error-tertiary"
              text={buttonText}
              onClick={onClick}
            />
          )}
        </>
      )}
    </Container>
  );
};

NotificationBox.defaultProps = {
  type: "primary",
  onClick: () => {},
  text: undefined,
  buttonText: "Aceptar",
  buttons: undefined,
};

const Container = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 15px;
  /* width: 350px; */

  @media (max-width: 400px) {
    flex-direction: column;
    width: 320px;
  }
`;

const Icon = styled.div`
  width: 13px;
  height: 13px;
  align-self: center;

  ${(props) => {
    if (props.type === "notification")
      return css`
        width: 33px;
        height: 33px;
      `;
    else if (props.type === "error")
      return css`
        width: 12px;
        height: 12px;
      `;
  }}
`;

const IconContainer = styled.div`
  display: flex;
  border-radius: 100%;
  margin-left: 10px;
  width: 26px;
  height: 26px;
  align-content: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  margin: 10px;

  ${(props) => {
    if (props.type === "information")
      return css`
        background-color: #3a8af8;
        ${Icon} {
          fill: #ffffff;
        }
      `;
    else if (props.type === "notification")
      return css`
        background-color: #ffffff;
        ${Icon} {
          fill: #f7bb07;
        }
      `;
    else if (props.type === "error")
      return css`
        background-color: #f44336;
        ${Icon} {
          fill: #ffffff;
        }
      `;
  }}
`;

const NotificationButton = styled(Button)`
  margin: 3px;
  margin-left: 12px;
  margin-right: 10px;
  flex: 1 0 0px;
`;

const Children = styled.div`
  margin: 10px;
  text-align: justify;
  /* margin-left: 30px; */
  flex: 2 0 0px;
`;

const WrapperButtons = styled.div`
  display: flex;
  flex-direction: column;

  margin: 12px;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export default NotificationBox;
