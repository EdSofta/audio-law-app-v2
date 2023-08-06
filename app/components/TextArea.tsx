import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type Prop = {
  column: number;
  style: StyleProp<ViewStyle>;
};

type Style = {};

const TextArea: React.FC<Prop> = () => {
  return <></>;
};

const style = StyleSheet.create<Style>({});

export default TextArea;
