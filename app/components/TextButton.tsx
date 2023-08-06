import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { textStyles } from "../config/styles";
import colors from "../config/colors";

type Prop = {
  onPress: () => void;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  LeftIcon?: React.FC;
  RightIcon?: React.FC;
};

const TextButton: React.FC<Prop> = ({
  onPress,
  title,
  textStyle,
  style,
  LeftIcon,
  RightIcon,
}) => {
  return (
    <TouchableOpacity
      style={[{ flexDirection: "column" }, style]}
      onPress={onPress}
    >
      {LeftIcon && <LeftIcon />}
      <Text style={[textStyles.small, { color: colors.dark_blue }, textStyle]}>
        {title}
      </Text>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};

export default TextButton;
