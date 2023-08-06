import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Prop = {
  style?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  source: ImageSourcePropType;
};

const ImageButton: React.FC<Prop> = ({ source, imgStyle, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={source} style={imgStyle} />
    </TouchableOpacity>
  );
};

export default ImageButton;
