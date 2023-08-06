import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import HomeScreen from "../pages/HomeScreen";

export type HomeStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME} component={HomeScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
