import React, { useEffect, useRef, useMemo, useState } from "react";
// import ClientesAPI from "../../api/ClientesAPI";
import Table from "../components/Table";
import styled, { css } from "styled-components";
import MembersAPI from "../api/MembersAPI";
import Bag from "../components/Bag";

const ListarMembers = ({ tokenData, newData }) => {
  const [members, setMembers] = useState([]);
  const [token, setToken] = useState(tokenData);

  useEffect(() => {
    setToken(tokenData);
  }, [tokenData]);

  useEffect(() => {
    if (token) {
      console.log(token);
      MembersAPI.getMembers(setMembers, token);
    }
  }, [token]);

  useEffect(() => {}, [members]);

  const tableRef = useRef();
  const COLUMNS = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Address",
        accessor: "address",
        width: 220,

        Cell: ({ value }) => <Label>{value}</Label>,
      },
      {
        Header: "SSN",
        accessor: "ssn",
        width: 220,
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
    ],

    []
  );
  ListarMembers.defaultProps = {
    tokenData: undefined,
  };
  return (
    <BagStyled>
      <Header>
        <Title>Lista de clientes</Title>
        {/* <p>{token}</p> */}
      </Header>
      <Table ref={tableRef} columns={COLUMNS} data={members} />
    </BagStyled>
  );
};

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const BagStyled = styled(Bag)`
  flex: 1 0 0;
  margin-left: 20px;
`;
const Header = styled.div`
  margin-bottom: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 1.2em;
`;

export default ListarMembers;
