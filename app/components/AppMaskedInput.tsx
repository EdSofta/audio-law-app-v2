import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import colors from '../config/colors';
import { textStyles } from '../config/styles';

type Prop = {
  width?: string | number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  IconComponent?: React.FC;
  iconPosition?: 'left' | 'right';
} & React.ComponentProps<typeof MaskInput>;

const AppMaskedInput: React.FC<Prop> = ({
  width = '100%',
  style = {},
  onFocus = null,
  onBlur = null,
  placeholderTextColor = null,
  editable = false,
  containerStyle,
  IconComponent,
  iconPosition = 'left',
  ...others
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        customStyle.container,
        isFocused && customStyle.isFocused,
        { width },
        containerStyle,
      ]}
    >
      {IconComponent && iconPosition == 'left' && <IconComponent />}
      <MaskInput
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
      {IconComponent && iconPosition == 'right' && <IconComponent />}
    </View>
  );
};

export default AppMaskedInput;

const customStyle = StyleSheet.create({
  container: {
    borderRadius: 27,
    backgroundColor: colors.muted_green,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexGrow: 1,
    color: colors.dark_blue,
  },
  isFocused: {
    borderColor: '#345D5F',
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: colors.medium_grey,
  },
});
