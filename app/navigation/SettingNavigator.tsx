import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import SettingScreen from "../pages/SettingScreen";
import ProfileScreen from "../pages/ProfileScreen";
import SubscriptionScreen from "../pages/SubscriptionScreen";
import ChangePasswordScreen from "../pages/ChangePasswordScreen";

export type SettingStackParamList = {
  SettingIndex: undefined;
  Profile: undefined;
  Change_Password: undefined;
  Payment_Info: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.SETTING_INDEX} component={SettingScreen} />
    <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={routes.PAYMENT_INFO} component={SubscriptionScreen} />
    <Stack.Screen
      name={routes.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
    />
  </Stack.Navigator>
);

export default SettingNavigator;
