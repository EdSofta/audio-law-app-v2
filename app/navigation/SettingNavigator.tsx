import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import SettingScreen from '../pages/SettingScreen';
import ProfileScreen from '../pages/ProfileScreen';
import SubscriptionPaymentScreen from '../pages/SubscriptionPaymentScreen';
import ChangePasswordScreen from '../pages/ChangePasswordScreen';
import PaymentPortal from '../pages/PaymentPortal';
import { PaystackPlan } from '../api/paystack';
import SubscriptionDetailsScreen from '../pages/SubscriptionDetailsScreen';

export type SettingStackParamList = {
  SettingIndex: undefined;
  Profile: undefined;
  Change_Password: undefined;
  Payment_Info: undefined;
  SubscriptionDetails: undefined;
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
    <Stack.Screen
      name={routes.PAYMENT_INFO}
      component={SubscriptionPaymentScreen}
    />
    <Stack.Screen
      name={routes.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
    />
    <Stack.Screen
      name={routes.SUBSCRIPTION_DETAILS}
      component={SubscriptionDetailsScreen}
    />
  </Stack.Navigator>
);

export default SettingNavigator;
