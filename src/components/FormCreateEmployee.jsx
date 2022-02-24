import React, { useMemo, useEffect, useRef, useState } from "react";
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
import { useIdleTimer } from "react-idle-timer";

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
  var initDataFormatted = useMemo(
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
  const resetButton = useRef(null);
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

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    var d = new Date(getLastActiveTime());
    console.log("last active", d);
  };
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    debounce: 500,
  });
  const [lastActive, setLastActive] = useState(new Date(getLastActiveTime()));
  const [saveDisabled, setSaveDisabled] = useState(false);

  const disable = () => {
    console.log(initDataFormatted);
    if (initDataFormatted.firstName.length > 1) {
      setSaveDisabled(true);
    }
  };
  useEffect(() => {
    disable();
  }, [initDataFormatted]);
  const [actualTime, setActualTime] = useState(new Date());

  const [currentCount, setCount] = useState(0);
  const timer = () => setCount(currentCount + 1);

  useEffect(() => {
    const id = setInterval(timer, 1000);
    setLastActive(new Date(getLastActiveTime()));
    setActualTime(new Date());
    var diff = (actualTime.getTime() - lastActive.getTime()) / 1000;
    if (diff > 120) {
      resetButton.current.click();
    }
    console.log(actualTime);
    console.log(lastActive);
    return () => clearInterval(id);
  }, [currentCount]);

  return (
    <Formik
      enableReinitialize={true}
      validate={validate}
      initialValues={initDataFormatted}
      validationSchema={yup.object({
        firstName: yup
          .string()
          .required("This field should be filled.")
          .min(2, "Must be more than 1 character"),
        lastName: yup
          .string()
          .required("This field should be filled.")
          .min(2, "Must be more than 1 character"),
        address: yup
          .string()
          .required("This field should be filled.")
          .min(2, "Must be more than 1 character"),
        ssn: yup
          .string()
          .required("This field should be filled.")
          .min(2, "Must be more than 1 character"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(HelperObj.clean(values));
      }}
    >
      {({
        values,
        errors,
        resetForm,
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
                hasError={touched.firstName && errors.firstName}
              />
            </ContainerQuestion>
            <ContainerQuestion>
              <InputStyled
                type="text"
                name="lastName"
                placeholder="Last Name"
                hasError={touched.lastName && errors.lastName}
              />
            </ContainerQuestion>

            <ContainerQuestion>
              <InputStyled
                type="text"
                name="address"
                placeholder="Address"
                hasError={touched.address && errors.address}
              />
            </ContainerQuestion>
            <ContainerQuestion>
              <InputStyled
                type="text"
                name="ssn"
                placeholder="SSN"
                hasError={touched.ssn && errors.ssn}
              />
            </ContainerQuestion>

            <ButtonWrapper>
              <StyledButton
                type="primary"
                text={"Reset"}
                ref={resetButton}
                onClick={() => {
                  resetForm();
                }}
              ></StyledButton>
              <StyledButton
                type="primary"
                text={"Save"}
                disabled={saveDisabled}
                onClick={() => {
                  submitForm();
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
