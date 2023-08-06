import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppTextInput from "./AppTextInput";
import { useFormikContext } from "formik";
import colors from "../config/colors";
import ErrorMessage from "./ErrorMessage";

type Prop = React.ComponentProps<typeof AppTextInput> & {
  name: string;
  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<ViewStyle>;
};

type Style = {};

const FormField: React.FC<Prop> = ({
  name,
  errorStyle,
  style,
  containerStyle,
  inputContainerStyle,
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <View style={containerStyle} focusable>
      <AppTextInput
        focusable
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        containerStyle={[
          errors[name] && { borderColor: colors.red, borderWidth: 1 },
          inputContainerStyle,
        ]}
        style={[style]}
        {...otherProps}
      />
      {touched[name] && (
        <ErrorMessage
          text={errors[name]}
          style={[{ marginTop: 2, marginLeft: 15 }, errorStyle]}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create<Style>({});

export default FormField;
