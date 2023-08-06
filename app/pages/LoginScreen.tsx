import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Screen from '../components/Screen';
import { textStyles } from '../config/styles';
import colors from '../config/colors';
import * as Yup from 'yup';
import { FormikValues } from 'formik';
import Form from '../components/Form';
import FormField from '../components/FormField';
import PasswordFormField from '../components/PasswordFormField';
import TextButton from '../components/TextButton';
import routes from '../navigation/routes';
import SubmitButton from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { loginApi } from '../api/auth';
import Toast from 'react-native-root-toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import useAuth from '../auth/useAuth';
import { test_token } from '../utils/constants';
import { CancelToken } from 'apisauce';

type Prop = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type Style = {
  container: ViewStyle;
  heading: ViewStyle;
  subtitle: ViewStyle;
  form: ViewStyle;
  input: ViewStyle;
  inputText: TextStyle;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen: React.FC<Prop> = ({ navigation }) => {
  const { data, request, error, loading } = useApi(loginApi);
  const { login } = useAuth();

  useMemo(() => {
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

  const handleSubmit = (form: FormikValues) => {
    request(form, CancelToken.source()).then(async ({ ok, data }) => {
      if (ok) {
        if (data && data.data?.token) {
          await login(data.data.token);
        }
      }
    });
  };

  const handleForgotPassword = () => {
    navigation.replace(routes.FORGOT_PASSWORD);
  };

  const handleSignUp = () => {
    navigation.replace(routes.REGISTER);
  };

  return (
    <Screen
      style={{
        backgroundColor: colors.dark_blue,
      }}
    >
      <ScrollView
        style={style.container}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
        <Text style={style.heading}>Sign in</Text>
        <Text style={style.subtitle}>
          To your library of lead judgements of the Supreme Court of Nigeria
        </Text>
        <View style={style.form}>
          <Form
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '' }}
          >
            <FormField
              name="email"
              keyboardType="email-address"
              placeholder="Email"
              style={style.inputText}
              containerStyle={style.input}
            />
            <PasswordFormField
              name="password"
              placeholder="Password"
              style={style.inputText}
              containerStyle={style.input}
              iconColor="#8DA1A1"
            />
            <TextButton
              onPress={handleForgotPassword}
              title="Forgot Password?"
              style={{ marginLeft: 'auto', marginBottom: 70 }}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={colors.dark_blue}
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            )}
            {!loading && <SubmitButton title="Sign In" />}
          </Form>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={[textStyles.small, { color: colors.dark_blue }]}>
              Don't have an account?{' '}
            </Text>
            <TextButton
              onPress={handleSignUp}
              title="Sign up"
              textStyle={{ fontFamily: 'Montserrat_Bold' }}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const style = StyleSheet.create<Style>({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  heading: {
    ...textStyles.heading2,
    color: '#EBEBEB',
    textAlign: 'center',
  },
  subtitle: {
    ...textStyles.body,
    textAlign: 'center',
    width: 238,
    color: '#EBEBEB',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    backgroundColor: '#FCFCFC',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    marginBottom: 20,
  },
  inputText: {
    color: '#8DA1A1',
  },
});

export default LoginScreen;
