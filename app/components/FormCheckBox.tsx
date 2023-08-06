import React from "react";
import CheckBox from "./CheckBox";
import { useFormikContext } from "formik";

type Prop = React.ComponentProps<typeof CheckBox> & {
  name: string;
};

const FormCheckBox: React.FC<Prop> = ({ name, ...otherProps }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  return (
    <CheckBox
      checked={values[name]}
      invalid={touched && errors[name]}
      onCheckChange={(value) => setFieldValue(name, value)}
      {...otherProps}
    />
  );
};

export default FormCheckBox;
