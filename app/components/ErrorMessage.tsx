import React from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import { textStyles } from "../config/styles";

type Prop = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

const ErrorMessage: React.FC<Prop> = ({ text, style }) => {
  if (!text) return null;
  return <Text style={[textStyles.errorText, style]}>{text}</Text>;
};

export default ErrorMessage;
