import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

type Prop = {
  onPress?: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
};

const Button: React.FC<React.PropsWithChildren<Prop>> = ({
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
  children,
  title,
}) => {
  return (
    <TouchableHighlight
      style={[buttonStyle, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[{ marginHorizontal: 'auto' }, textStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
