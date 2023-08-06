import React, { type PropsWithChildren } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Constants from "expo-constants";

type Prop = {
  style?: StyleProp<ViewStyle>;
};

type Styles = {
  screen: ViewStyle;
};

const Screen: React.FC<PropsWithChildren<Prop>> = ({ children, style }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create<Styles>({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
