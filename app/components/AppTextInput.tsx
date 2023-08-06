import React, { useEffect, useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import colors from "../config/colors";
import { textStyles } from "../config/styles";

type Prop = React.ComponentProps<typeof TextInput> & {
  width?: string | number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  IconComponent?: React.FC;
  iconPosition?: "left" | "right";
};

type Style = {
  input: ViewStyle;
  container: ViewStyle;
  isFocused: ViewStyle;
  disabled: ViewStyle;
};

const AppTextInput: React.FC<Prop> = ({
  width = "100%",
  style = {},
  onFocus = null,
  onBlur = null,
  placeholderTextColor = null,
  editable = false,
  containerStyle,
  IconComponent,
  iconPosition = "left",
  ...others
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<TextInput>(null);

  const handleOnTap = () => {
    containerRef?.current?.focus();
  };

  useEffect(() => {
    if (containerRef.current) {
    }
  }, [containerRef]);

  return (
    <View
      style={[
        customStyle.container,
        isFocused && customStyle.isFocused,
        { width },
        containerStyle,
      ]}
    >
      {IconComponent && iconPosition == "left" && <IconComponent />}
      <TextInput
        ref={containerRef}
        style={[customStyle.input, textStyles.small, style]}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : colors.light_grey
        }
        onFocus={(e) => {
          onFocus && onFocus(e);
          setIsFocused(true);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e);
          setIsFocused(false);
        }}
        {...others}
      />
      {IconComponent && iconPosition == "right" && <IconComponent />}
    </View>
  );
};

const customStyle = StyleSheet.create<Style>({
  container: {
    borderRadius: 27,
    backgroundColor: colors.muted_green,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexGrow: 1,
    color: colors.dark_blue,
  },
  isFocused: {
    borderColor: "#345D5F",
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: colors.medium_grey,
  },
});

export default AppTextInput;
