import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Bag from "../components/Bag";
import { useImmer } from "use-immer";
// import Adapter from "../../helpers/Adapter";
import FormCreateEmployee from "../components/FormCreateEmployee";
// import ClientesAPI from "../../api/ClientesAPI";
import MembersAPI from "../api/MembersAPI";

const CreateEmployee = ({ tokenData }) => {
  const [data, setData] = useImmer({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationText, setNotificationText] = useState(undefined);
  const [notificationTextType, setNotificationTextType] = useState("error");
  const [token, setToken] = useState(tokenData);

  useEffect(() => {
    setToken(tokenData);
  }, [tokenData]);

  useEffect(() => {
    if (isSubmitting) {
      MembersAPI.createMember(data, token)
        .then((res) => {
          setNotificationText("Member added successfully");
          setNotificationTextType("information");
        })
        .catch((e) => {
          // console.log(e.response.data.message);
          setNotificationText(e.response.data.message);
          setNotificationTextType("error");
        });

      setIsSubmitting(false);
      // });
    }
  }, [isSubmitting]);
  CreateEmployee.defaultProps = {
    tokenData: undefined,
  };
  return (
    <BagStyled
      header={
        <Header>
          <Title>Home</Title>
        </Header>
      }
    >
      <FormCreateEmployee
        initData={{ nombre: "", apellido: "", fecnac: "" }}
        onSubmit={(data) => {
          setData(data);
          setIsSubmitting(true);
        }}
        notificationText={notificationText}
        notificationTextType={notificationTextType}
        isSubmiting={isSubmitting}
        onClickNotification={() => setNotificationText(undefined)}
      ></FormCreateEmployee>
    </BagStyled>
  );
};

const BagStyled = styled(Bag)`
  flex: 1 0 0;
  @media (max-width: 400px) {
    max-width: 500px;
    width: 100%;
  }
  margin-right: 20px;
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
export default CreateEmployee;
