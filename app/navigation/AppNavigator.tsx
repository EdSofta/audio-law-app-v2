import routes from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { textStyles } from "../config/styles";
import HomeNavigator from "./HomeNavigator";
import CategoryNavigator from "./CategoryNavigator";
import SettingNavigator from "./SettingNavigator";
import FavouritesScreen from "../pages/FavouritesScreen";
import AudioScreen from "../pages/AudioScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WebViewScreen from "../pages/WebViewScreen";
import {Foundation, Octicons, FontAwesome, Ionicons} from '@expo/vector-icons'

export type MainStackParamsList = {
  Dashboard: undefined;
  Category: undefined;
  Setting: undefined;
  Favorites: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  Audio: undefined;
  Webview: {
    url: string;
  };
};

const Tab = createBottomTabNavigator<MainStackParamsList>();

const Stack = createNativeStackNavigator<AppStackParamList>();

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#0E4F73",
      tabBarInactiveTintColor: "#555555",
      tabBarLabelStyle: { ...textStyles.xsmall },
    }}
  >
    <Tab.Screen
      name={routes.DASHBOARD}
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          focused ? <Foundation name="home" size={25} color={color} /> : <Octicons name="home" size={20} color={color} />
        ),
        title: "Home",
      }}
    />
    <Tab.Screen
      name={routes.CATEGORY}
      component={CategoryNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            color={color}
            size={20}
            name={focused ? 'grid' : 'grid-outline'}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.FAVORITES}
      component={FavouritesScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome
            color={color}
            name={focused ? "heart" : "heart-o"}
            size={20}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.SETTING}
      component={SettingNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            color={color}
            size={20}
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.MAIN} component={MainNavigator} />
    <Stack.Screen name={routes.AUDIO} component={AudioScreen} />
    <Stack.Screen name={routes.WEBVIEW} component={WebViewScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
