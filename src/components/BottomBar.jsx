import React from "react";
import styled from "styled-components";

const TopBar = () => {
  return (
    <Container>
      <Half1>
        <Text1>copyright</Text1>
      </Half1>
      <Half2>
        <Text2>All rights reserved</Text2>
      </Half2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
`;
const Half1 = styled.div`
  background-color: #0071bc;
  height: 60px;
  width: 50%;
`;
const Half2 = styled.div`
  background-color: #0071bc;
  height: 60px;
  width: 50%;
  text-align: end;
`;
const Text1 = styled.div`
  margin-left: 80px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;
const Text2 = styled.div`
  margin-right: 80px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export default TopBar;
