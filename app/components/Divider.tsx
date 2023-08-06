import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Prop = {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Divider: React.FC<Prop> = ({
  width = "100%",
  height = 1,
  color = "#D9D9D9",
  style,
}) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: color,
          marginLeft: "auto",
          marginRight: "auto",
        },
        style,
      ]}
    ></View>
  );
};

export default Divider;
