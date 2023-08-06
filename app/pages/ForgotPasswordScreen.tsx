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
import { useApi } from "../hooks/useApi";
import { forgotPassword } from "../api/auth";
import Toast from "react-native-root-toast";
import colors from "../config/colors";
import { FormikValues } from "formik";
import { CancelToken } from "apisauce";
import routes from "../navigation/routes";
import Form from "../components/Form";
import FormField from "../components/FormField";
import TextButton from "../components/TextButton";
import SubmitButton from "../components/SubmitButton";
import Screen from "../components/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";

type Prop = NativeStackScreenProps<AuthStackParamList, "Forgot_Password">;
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
});

const ForgotPasswordScreen: React.FC<Prop> = ({ navigation }) => {
  const { data, request, error, loading } = useApi(forgotPassword);

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
    request(form, CancelToken.source());
  };

  const handleSignUp = () => {
    navigation.replace(routes.REGISTER);
  };
  const handleSignIn = () => {
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
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
        <Text style={style.heading}>Password Reset</Text>
        <Text style={style.subtitle}>
          Lörem ipsum besk tett eurodektig koner. Kontratiligen oling doligen.
        </Text>
        <View style={style.form}>
          <Text style={[textStyles.body, { marginBottom: 20 }]}>
            Password reset link will be sent to your email address. Know your
            password?{" "}
            <Text
              style={{
                fontWeight: "600",
                fontFamily: "Montserrat_Bold",
              }}
              onPress={handleSignIn}
            >
              Sign in here
            </Text>
          </Text>
          <Form
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ email: "" }}
          >
            <FormField
              name="email"
              keyboardType="email-address"
              placeholder="Email"
              style={style.inputText}
              containerStyle={style.input}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={colors.dark_blue}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            )}
            {!loading && <SubmitButton title="Submit" />}
          </Form>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={[textStyles.small, { color: colors.dark_blue }]}>
              Don't have an account?{" "}
            </Text>
            <TextButton
              onPress={handleSignUp}
              title="Sign up"
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
    paddingTop: 50,
    backgroundColor: "#FCFCFC",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: "100%",
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    marginBottom: 50,
  },
  inputText: {
    color: "#8DA1A1",
  },
});

export default ForgotPasswordScreen;
