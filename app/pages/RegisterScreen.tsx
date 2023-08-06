import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import * as Yup from "yup";
import { textStyles } from "../config/styles";
import colors from "../config/colors";
import { FormikValues } from "formik";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Form from "../components/Form";
import FormField from "../components/FormField";
import PasswordFormField from "../components/PasswordFormField";
import TextButton from "../components/TextButton";
import SubmitButton from "../components/SubmitButton";
import FormCheckBox from "../components/FormCheckBox";
import { useApi } from "../hooks/useApi";
import { register } from "../api/auth";
import { CancelToken } from "apisauce";
import Toast from "react-native-root-toast";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";

type Prop = NativeStackScreenProps<AuthStackParamList, "Register">;

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
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please re enter password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  name: Yup.string().required("Full name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .length(11, "Enter a valid phone number"),
  agree: Yup.bool().required().oneOf([true]),
});

const RegisterScreen: React.FC<Prop> = ({ navigation }) => {
  const { data, request, error, loading } = useApi(register);

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
    request(form, CancelToken.source()).then(({ ok, data }) => {
      if (ok) {
        if (data != null) {
          Toast.show(data.message, {
            hideOnPress: true,
            backgroundColor: colors.dark_green,
            textColor: colors.white,
            animation: true,
            duration: 4000,
          });
          navigation.replace(routes.LOGIN);
        }
      }
    });
  };

  const handleLogin = () => {
    navigation.replace(routes.LOGIN);
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
        <Text style={style.heading}>Sign up</Text>
        <Text style={style.subtitle}>
          For a library of lead judgements of the Supreme Court of Nigeria
        </Text>
        <View style={style.form}>
          <Form
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
              name: "",
              passwordConfirmation: "",
              phone: "",
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

            <PasswordFormField
              name="password"
              placeholder="Password"
              style={style.inputText}
              containerStyle={style.input}
              iconColor="#8DA1A1"
            />

            <PasswordFormField
              name="passwordConfirmation"
              placeholder="Confirm Password"
              style={style.inputText}
              containerStyle={style.input}
              iconColor="#8DA1A1"
            />

            <FormCheckBox name="agree" style={{ marginBottom: 58 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    textStyles.xsmall,
                    { fontFamily: "Poppins", color: colors.dark_green },
                  ]}
                >
                  By continuing you agree to{" "}
                </Text>
                <Text
                  style={[
                    textStyles.xsmall,
                    {
                      fontFamily: "Poppins",
                      color: colors.dark_green,
                      fontWeight: "600",
                      letterSpacing: 0.05,
                    },
                  ]}
                >
                  Terms & Condition
                </Text>
              </View>
            </FormCheckBox>
            {loading && (
              <ActivityIndicator
                size="large"
                color={colors.dark_green}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            )}
            {!loading && <SubmitButton title="Sign Up" />}
          </Form>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={[textStyles.small, { color: colors.dark_green }]}>
              Already have an account?{" "}
            </Text>
            <TextButton
              onPress={handleLogin}
              title="Login"
              textStyle={{ fontFamily: "Montserrat_Bold" }}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const style = StyleSheet.create<Style>({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  heading: {
    ...textStyles.heading2,
    color: "#EBEBEB",
    textAlign: "center",
  },
  subtitle: {
    ...textStyles.body,
    textAlign: "center",
    width: 238,
    color: "#EBEBEB",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    backgroundColor: "#FCFCFC",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    marginBottom: 20,
  },
  inputText: {
    color: "#8DA1A1",
  },
});

export default RegisterScreen;
