import React, { useState } from "react";
import { Pressable } from "react-native";
import FormField from "./FormField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

type Prop = React.ComponentProps<typeof FormField> & {
  iconColor?: string;
};

const PasswordFormField: React.FC<Prop> = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <FormField
      {...props}
      autoCorrect={false}
      autoComplete="off"
      secureTextEntry={!passwordVisible}
      IconComponent={() => (
        <Pressable
          style={{ marginRight: 20 }}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <MaterialCommunityIcons
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={props.iconColor || colors.light_green}
          />
        </Pressable>
      )}
      iconPosition="right"
    />
  );
};

export default PasswordFormField;
