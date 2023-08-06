import React from 'react';
import { Keyboard } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

type Prop = {
  onSubmit: (values: FormikValues, resetForm: () => void) => void;
  validationSchema: Yup.AnyObjectSchema;
  initialValues: Object;
};

const Form: React.FC<React.PropsWithChildren<Prop>> = ({
  initialValues,
  onSubmit,
  children,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        Keyboard.dismiss();
        onSubmit(values, resetForm);
      }}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
