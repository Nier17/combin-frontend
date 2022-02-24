import React, { useEffect, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import ListMembers from "./ListMembers";
import styled from "styled-components";
import MembersAPI from "../api/MembersAPI";
import Bag from "../components/Bag";

const BoardHome = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    MembersAPI.authUser(setToken);
  }, []);
  return (
    // <Container>
    //   <BagStyled>
    <Container>
      <BagStyled>
        <CreateEmployee tokenData={token}></CreateEmployee>
        <ListMembers tokenData={token}></ListMembers>
      </BagStyled>
    </Container>
  );
};

const ContainerCreateForm = styled.div``;

const Container2 = styled.div`
  display: flex;
`;
const BagStyled = styled.div`
  display: flex;
  /* flex: 1 0 0; */
  background-color: red;
  margin: 10px;
  padding: 30px;
  /* margin: 10px; */
`;

const Container = styled.div`
  display: flex;
  /* flex: 1 0 0; */
  /* margin: 10px; */
  padding: 30px;
  /* margin: 10px; */
`;
export default BoardHome;
