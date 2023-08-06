import React from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ScreenWithToolbar from "../components/ScreenWithToolbar";
import { textStyles } from "../config/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "../navigation/CategoryNavigator";
import routes from "../navigation/routes";
import { categories } from "../utils/constants";

type Prop = NativeStackScreenProps<
  CategoryStackParamList,
  "CategoryIndex",
  "Category"
>;

type Style = {
  container: ViewStyle;
  banner: ImageStyle;
  card: ViewStyle;
  cardText: ViewStyle;
  cardImage: ImageStyle;
};

const CategoryScreen: React.FC<Prop> = ({ navigation }) => {
  return (
    <ScreenWithToolbar>
      <ScrollView contentContainerStyle={style.container}>
        <Image
          source={require("../../assets/category-banner.png")}
          style={style.banner}
          resizeMode="cover"
        />
        <Text
          style={{ ...textStyles.heading4, color: "#323232", marginBottom: 30 }}
        >
          Categories
        </Text>
        <FlatList
          data={categories}
          numColumns={2}
          renderItem={({ item: category }) => (
            <TouchableOpacity
              key={category.slug}
              onPress={() =>
                navigation.navigate(routes.CATEGORY_DETAILS, {
                  category: category.slug,
                })
              }
              style={{
                ...style.card,
                backgroundColor: category.primaryColor,
                marginRight: 20,
              }}
            >
              <Image source={category.imgUri} style={style.cardImage} />
              <Text style={style.cardText}>{category.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.slug}
        />
      </ScrollView>
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create<Style>({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  banner: {
    height: 287,
    width: "100%",
    marginBottom: 20,
  },
  card: {
    height: 174,
    flex: 1,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 35,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardText: {
    ...textStyles.body,
    fontFamily: "Montserrat_Medium",
    fontWeight: "600",
    marginTop: 27,
    textAlign: "center",
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
});

export default CategoryScreen;
