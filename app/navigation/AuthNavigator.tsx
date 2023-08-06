import routes from "./routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../pages/RegisterScreen";
import LoginScreen from "../pages/LoginScreen";
import ForgotPasswordScreen from "../pages/ForgotPasswordScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Forgot_Password: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, animation: "slide_from_right" }}
  >
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD}
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
