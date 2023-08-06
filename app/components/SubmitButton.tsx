import React from "react";
import MediumButton from "./MediumButton";
import { useFormikContext } from "formik";

type Prop = {
  title: string;
};

const SubmitButton: React.FC<Prop> = ({ title }) => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <MediumButton
      title={title}
      disabled={!isValid}
      onPress={handleSubmit}
      backgroundColor="#0E4F73"
    />
  );
};

export default SubmitButton;
