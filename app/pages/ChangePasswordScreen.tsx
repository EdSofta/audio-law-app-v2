import React, { useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import { useApi } from '../hooks/useApi';
import { forgotPassword } from '../api/auth';
import Toast from 'react-native-root-toast';
import colors from '../config/colors';
import { FormikValues } from 'formik';
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import useAuth from '../auth/useAuth';
import ProfilePage, { style } from '../components/ProfilePage';
import PasswordFormField from '../components/PasswordFormField';
import { CancelToken } from 'apisauce';

type Prop = {};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Please enter current password'),
  newPassword: Yup.string().required('Please enter new password'),
  confirmNewPassword: Yup.string()
    .required('Please re enter new password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const ChangePasswordScreen: React.FC<Prop> = ({}) => {
  const { request, error, loading } = useApi(forgotPassword);
  const abortControllerRef = useRef<any>(CancelToken.source());

  const handleSubmit = async (
    formValues: FormikValues,
    resetForm: () => void
  ) => {
    try {
      const { ok, data, problem } = await request(
        formValues,
        abortControllerRef.current
      );
      if (ok) {
        Toast.show('Password Updated');
        resetForm();
      } else {
        Toast.show(data?.message || problem);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const controller = abortControllerRef.current;
    // return () => controller.cancel();
  }, []);

  useEffect(() => {
    if (error) {
      Toast.show(error, {
        hideOnPress: true,
        backgroundColor: colors.red,
        textColor: colors.white,
        animation: true,
        duration: 4000,
      });
    }
  }, [error]);

  return (
    <ProfilePage>
      <ScrollView
        style={{
          flexGrow: 1,
          marginTop: 30,
        }}
        contentContainerStyle={style.body}
      >
        <Form
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            oldPassword: '',
            newPassword: '',
          }}
        >
          <PasswordFormField
            name="oldPassword"
            placeholder="Old Password"
            style={style.inputText}
            containerStyle={style.input}
            iconColor="#8DA1A1"
            returnKeyType="next"
          />

          <PasswordFormField
            name="newPassword"
            placeholder="New Password"
            style={style.inputText}
            containerStyle={style.input}
            iconColor="#8DA1A1"
          />

          <PasswordFormField
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            style={style.inputText}
            containerStyle={style.input}
            iconColor="#8DA1A1"
          />

          <View style={{ marginTop: 50 }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.dark_blue}
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            ) : (
              <SubmitButton title="Save Changes" />
            )}
          </View>
        </Form>
      </ScrollView>
    </ProfilePage>
  );
};

export default ChangePasswordScreen;
