import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import CategoryScreen from "../pages/CategoryScreen";
import CategoryDetailsScreen from "../pages/CategoryDetailsScreen";

export type CategoryStackParamList = {
  CategoryIndex: undefined;
  CategoryDetails: { category: string };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.CATEGORY_INDEX} component={CategoryScreen} />
    <Stack.Screen
      name={routes.CATEGORY_DETAILS}
      component={CategoryDetailsScreen}
    />
  </Stack.Navigator>
);

export default CategoryNavigator;
