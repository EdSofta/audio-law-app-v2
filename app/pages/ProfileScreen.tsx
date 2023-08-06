import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import useAuth from '../auth/useAuth';
import * as Yup from 'yup';
import { FormikValues } from 'formik';
import FormField from '../components/FormField';
import Form from '../components/Form';
import SubmitButton from '../components/SubmitButton';
import ProfilePage, { style } from '../components/ProfilePage';
import { useApi } from '../hooks/useApi';
import { updateProfileApi } from '../api/user';
import { CancelToken } from 'apisauce';
import colors from '../config/colors';
import Toast from 'react-native-root-toast';

type Prop = {};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  name: Yup.string().required('Full name is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .length(11, 'Enter a valid phone number'),
});

const ProfileScreen: React.FC<Prop> = () => {
  const { user, login } = useAuth();
  const { loading, request } = useApi(updateProfileApi);

  const abortControllerRef = useRef<any>(CancelToken.source());

  const handleSubmit = async (values: FormikValues) => {
    try {
      const { ok, data, problem } = await request(
        values,
        abortControllerRef.current
      );
      if (ok) {
        login(data.data.token);
        Toast.show('Profile Updated');
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
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
          }}
        >
          <FormField
            name="name"
            placeholder="Name"
            style={style.inputText}
            containerStyle={style.input}
            returnKeyType="next"
          />

          <FormField
            name="phone"
            keyboardType="phone-pad"
            placeholder="Phone"
            style={style.inputText}
            containerStyle={style.input}
          />

          <FormField
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            style={style.inputText}
            containerStyle={style.input}
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

export default ProfileScreen;
