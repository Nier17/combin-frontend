import { useField } from "formik";
import React from "react";
import Input from "./Input";

const InputField = (props) => {
  const [field, meta] = useField(props);

  return <Input {...field} {...props} />;
};

export { InputField };
