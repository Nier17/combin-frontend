import React from "react";
import styled from "styled-components";

const TopBar = () => {
  return (
    <Container>
      <Half>Home</Half>
      <Separation></Separation>
      <Half>Other page</Half>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
`;
const Half = styled.div`
  background-color: #009245;
  padding-top: 20px;
  height: 40px;
  width: 50%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
const Separation = styled.div`
  background-color: #000000;
  height: 60px;
  width: 1px;
`;

export default TopBar;
