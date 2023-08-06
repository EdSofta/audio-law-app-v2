import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Prop = {
  checked?: boolean;
  invalid?: boolean;
  onCheckChange?: (check: boolean) => void;
  text?: String;
  textStyle?: StyleProp<TextStyle>;
  checkedStyle?: StyleProp<ViewStyle>;
  uncheckedStyle?: StyleProp<ViewStyle>;
  checkColor?: string;
  style?: StyleProp<ViewStyle>;
};

type Style = {
  container: ViewStyle;
  checked: ViewStyle;
  unchecked: ViewStyle;
  default: ViewStyle;
};

const CheckBox: React.FC<React.PropsWithChildren<Prop>> = ({
  checked,
  checkColor,
  text,
  textStyle,
  checkedStyle,
  uncheckedStyle,
  style,
  onCheckChange,
  invalid,
  children,
}) => {
  return (
    <View style={[defaultStyle.container, style]}>
      <Pressable
        style={[
          defaultStyle.default,
          checked ? defaultStyle.checked : defaultStyle.unchecked,
          checked ? checkedStyle : uncheckedStyle,
          invalid && { borderColor: "red" },
        ]}
        onPress={() => onCheckChange && onCheckChange(!checked)}
      >
        {checked && (
          <MaterialCommunityIcons
            name="check"
            color={checkColor || colors.white}
            style={{
              flex: 1,
            }}
          />
        )}
      </Pressable>
      {text ? <Text style={textStyle}>text</Text> : children}
    </View>
  );
};

const defaultStyle = StyleSheet.create<Style>({
  checked: {
    backgroundColor: colors.dark_green,
  },
  unchecked: {
    borderWidth: 1,
    borderColor: colors.dark_green,
    backgroundColor: "transparent",
  },
  default: {
    width: 16,
    height: 16,
    marginRight: 8,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CheckBox;
