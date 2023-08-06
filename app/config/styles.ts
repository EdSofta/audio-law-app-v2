import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import colors from "./colors";

type TEXT_STYLE = {
  xsmall: TextStyle;
  small: TextStyle;
  medium: TextStyle;
  mediumButton: TextStyle;
  errorText: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  heading4: TextStyle;
  body: TextStyle;
};

type BUTTON_STYLE = {
  medium: ViewStyle;
};

export const textStyles = StyleSheet.create<TEXT_STYLE>({
  xsmall: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: "Poppins",
  },
  small: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  medium: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
  },
  heading2: {
    fontFamily: "Montserrat_Extra_Bold",
    fontSize: 24,
    lineHeight: 30,
  },
  heading3: {
    fontFamily: "Montserrat_Bold",
    fontSize: 20,
    lineHeight: 24,
  },
  heading4: {
    fontFamily: "Montserrat_Bold",
    fontSize: 16,
    lineHeight: 20,
  },
  body: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: "#555555",
  },
  errorText: {
    color: colors.red,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Poppins",
  },
  mediumButton: {
    fontFamily: "Montserrat_Semi_Bold",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.3,
    color: colors.white,
  },
});

export const buttonStyles = StyleSheet.create<BUTTON_STYLE>({
  medium: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.dark_green,
    borderRadius: 49,
    justifyContent: "center",
    alignItems: "center",
  },
});
