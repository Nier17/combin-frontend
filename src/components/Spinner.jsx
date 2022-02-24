import React from "react";
import styled, { keyframes, css } from "styled-components";

const Spinner = ({ type, className }) => (
  <Loader type={type} className={className} />
);

Spinner.defaultProps = {
  type: "s",
};

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  &,
  &:after {
    border-radius: 50%;

    ${(props) => {
      if (props.type === "m")
        return css`
          width: 30px;
          height: 30px;
        `;
      else if (props.type === "s")
        return css`
          width: 15px;
          height: 15px;
        `;
    }}
  }

  & {
    font-size: 3px;
    position: relative;
    border-top: 3px solid rgba(0, 0, 0, 0.2);
    border-right: 3px solid rgba(0, 0, 0, 0.2);
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    border-left: 3px solid #33c494;
    transform: translateZ(0);
    animation: ${rotate} 0.8s infinite linear;
  }
`;

export default Spinner;
