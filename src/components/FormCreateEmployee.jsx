import React, { useMemo, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ConnectedFocusError } from "focus-formik-error";
import * as yup from "yup";
import styled from "styled-components";
import produce from "immer";
import { InputField } from "./WithFormik";
import Spinner from "./Spinner";
import HelperObj from "../helpers/HelperObj";
import NotificationBox from "./NotificationBox";
import Button from "./Button";
const FormCreateEmployee = ({
  initData,
  onSubmit,
  isOnEdit,
  onClose,
  notificationText,
  isSubmitting,
  onClickNotification,
  notificationTextType,
}) => {
  const initDataFormatted = useMemo(
    () =>
      produce(initData, (draft) => {
        let init = {
          firstName: "",
          lastName: "",
          address: "",
          ssn: "",
        };
        return HelperObj.mixin(init, draft);
      }),
    [initData]
  );
  const notificationRef = useRef();
  useEffect(() => {
    if (notificationText && notificationRef.current) {
      notificationRef.current.scrollIntoViewIfNeeded(); //reemplace this. It's not supported in major browers.
    }
  }, [notificationText]);
  const validate = (values) => {
    const errors = {};
    return errors;
  };

  return (
    <Formik
      enableReinitialize={true}
      validate={validate}
      initialValues={initDataFormatted}
      validationSchema={yup.object({
        firstName: yup.string().required("Es obligatorio completar este dato."),
        lastName: yup.string().required("Es obligatorio completar este dato."),
        address: yup.string().required("Es obligatorio completar este dato."),
        ssn: yup.string().required("Es obligatorio completar este dato."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(HelperObj.clean(values));
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        handleChange,
      }) => (
        <Form>
          <ConnectedFocusError />
          <Container>
            {notificationText && (
              <WrapperNotification ref={notificationRef}>
                <NotificationBox
                  type={notificationTextType}
                  text={notificationText}
                  onClick={onClickNotification}
                />
              </WrapperNotification>
            )}
            <ContainerQuestion>
              <InputStyled
                type="text"
                name="firstName"
                placeholder="First Name"
                // hasError={touched.nombre && errors.nombre}
              />
            </ContainerQuestion>
            <ContainerQuestion>
              <InputStyled
                type="text"
                name="lastName"
                placeholder="Last Name"
                // hasError={touched.apellido && errors.apellido}
              />
            </ContainerQuestion>

            <ContainerQuestion>
              <InputStyled
                type="text"
                name="address"
                placeholder="Address"
                // hasError={touched.correo && errors.correo}
              />
            </ContainerQuestion>
            <ContainerQuestion>
              <InputStyled
                type="text"
                name="ssn"
                placeholder="SSN"
                // hasError={touched.correo && errors.correo}
              />
            </ContainerQuestion>

            <ButtonWrapper>
              <StyledButton
                type="primary"
                text={"Reset"}
                onClick={() => {
                  submitForm();
                }}
              ></StyledButton>
              <StyledButton
                type="primary"
                text={"Save"}
                onClick={() => {
                  submitForm();
                  console.log("gfdgfd");
                }}
              ></StyledButton>
            </ButtonWrapper>
          </Container>

          {isSubmitting && (
            <WrapperSpinner>
              <Spinner />
            </WrapperSpinner>
          )}
        </Form>
      )}
    </Formik>
  );
};
FormCreateEmployee.defaultProps = {
  notificationTextType: "error",
};

const InputStyled = styled(InputField)`
  width: 10px;
`;
const Container = styled.div``;
const QuestionsFlex = styled.div`
  display: flex;
`;
const WrapperNotification = styled.div`
  margin-bottom: 50px;
  width: 650px;
  /* width: 44.5%; */
`;
// const StyledNotification = styled(NotificationBox)`
//   @media (max-width: 500px) {
//   }
// `;
const ContainerQuestion = styled.div`
  margin-bottom: 50px;
  width: 350px;
`;
const WrapperSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ContainerQuestionLeft = styled.div`
  margin-bottom: 50px;
  width: 300px;

  /* width: 30%; */
`;
const ContainerQuestionRight = styled.div`
  margin-left: 50px;
  margin-bottom: 50px;
  width: 300px;
`;
const StyledButton = styled(Button)`
  width: 150px;
  align-self: baseline;
  margin: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: end; */
  /* flex-wrap: wrap; */
  /* width: 650px; */

  /* width: 100%; */
`;

export default FormCreateEmployee;
