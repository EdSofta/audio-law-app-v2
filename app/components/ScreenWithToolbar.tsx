import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Screen from "./Screen";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { textStyles } from "../config/styles";
import { Entypo } from '@expo/vector-icons';

type Prop = {
  style?: StyleProp<ViewStyle>;
  iconTint?: string;
  Icon?: React.FC;
  title?: string;
  handleBackClicked?: () => void;
};

type Style = {
  shadow: ViewStyle;
};

const ScreenWithToolbar: React.FC<React.PropsWithChildren<Prop>> = ({
  iconTint,
  children,
  style,
  Icon,
  title,
  handleBackClicked,
}) => {
  const { goBack } = useNavigation();
  return (
    <Screen
      style={[
        {
          backgroundColor: "white",
          paddingTop: 0,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 16,
          paddingBottom: 10,
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Pressable
          onPress={() => (handleBackClicked ? handleBackClicked() : goBack())}
          style={{}}
        >
          {Icon ? (
            <Icon />
          ) : (
            <Entypo size={25} color={iconTint || "#000000"} name="chevron-left" />
          )}
        </Pressable>
        <Text
          style={[
            textStyles.heading4,
            { flexGrow: 1, textAlign: "center", color: "#555555" },
          ]}
        >
          {title}
        </Text>
      </View>
      {children}
    </Screen>
  );
};

const defaultStyle = StyleSheet.create<Style>({
  shadow: {
    elevation: 4,
    shadowColor: "#1231550A",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
  },
});

export default ScreenWithToolbar;
