import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { textStyles } from "../../config/styles";
import useAuth from "../../auth/useAuth";

type Prop = {};

type Style = {
  container: ViewStyle;
  defaultImg: ViewStyle;
  content: ViewStyle;
  title: ViewStyle;
  subtitle: ViewStyle;
  notification: ViewStyle;
  badge: ViewStyle;
};

const Header: React.FC<Prop> = () => {
  const { user } = useAuth();
  return (
    <View style={style.container}>
      <View style={style.defaultImg}>
        <FontAwesome5 name="user-alt" size={20} color="#323232" />
      </View>
      <View style={style.content}>
        <Text style={style.title}>Hello {user?.name.split(" ")[1]}</Text>
        {/*<Text style={style.subtitle}>Lörem ipsum besk tett</Text>*/}
      </View>
      <View style={style.notification}>
        <Feather name="bell" size={24} color="black" />
        <View style={style.badge}></View>
      </View>
    </View>
  );
};

const style = StyleSheet.create<Style>({
  badge: {
    width: 9,
    height: 9,
    borderRadius: 7,
    backgroundColor: "#C22D2D",
    position: "absolute",
    right: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginLeft: 10,
  },
  defaultImg: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFCFF",
    borderRadius: 25,
  },
  notification: {
    marginLeft: "auto",
  },
  subtitle: {
    ...textStyles.body,
  },
  title: {
    ...textStyles.heading4,
    marginBottom: 5,
  },
});

export default Header;
