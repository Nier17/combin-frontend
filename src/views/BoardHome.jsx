import React, { useEffect, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import ListMembers from "./ListMembers";
import styled from "styled-components";
import MembersAPI from "../api/MembersAPI";
import Bag from "../components/Bag";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";

const BoardHome = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    MembersAPI.authUser(setToken);
  }, []);
  return (
    // <Container>
    //   <BagStyled>
    <BigContainer>
      <TopBar></TopBar>
      <Container>
        <BagStyled>
          <CreateEmployee tokenData={token}></CreateEmployee>
          <ListMembers tokenData={token}></ListMembers>
        </BagStyled>
      </Container>
      <BottomBar></BottomBar>
    </BigContainer>
  );
};

const ContainerCreateForm = styled.div``;

const BigContainer = styled.div``;
const BagStyled = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex: 1 0 0; */
  background-color: red;
  margin: 10px;
  padding: 30px;
  width: 100%;
  /* margin: 10px; */
`;

const Container = styled.div`
  display: flex;
  /* flex: 1 0 0; */
  /* margin: 10px; */
  padding: 30px;
  /* height: 770px; */
  /* margin: 10px; */
`;
export default BoardHome;
