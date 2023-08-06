import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Menu } from "../models/menu";
import { textStyles } from "../config/styles";
import { useNavigation } from "@react-navigation/native";

type Prop = {
  menu: Menu;
  onPress?: (menu: Menu) => void;
};

type Style = {
  container: ViewStyle;
  title: ViewStyle;
};

const MenuItem: React.FC<Prop> = ({ menu, onPress }) => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    if (menu.link) {
      navigate(menu.link);
    } else {
      onPress?.(menu);
    }
  };
  return (
    <TouchableOpacity style={style.container} onPress={handlePress}>
      <menu.leftIcon />
      <Text style={style.title}>{menu.title}</Text>
      <menu.rightIcon />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create<Style>({
  container: {
    paddingLeft: 20,
    paddingRight: 28,
    paddingVertical: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    marginLeft: 15,
    ...textStyles.body,
  },
});

export default MenuItem;
