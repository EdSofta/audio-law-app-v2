import React from "react";
import Button from "./Button";
import { buttonStyles, textStyles } from "../config/styles";

type Prop = {
  onPress: () => void;
  backgroundColor?: string;
  disabled?: boolean;
  title: string;
};

type Style = {};

const MediumButton: React.FC<Prop> = ({
  onPress,
  backgroundColor,
  disabled,
  title,
}) => {
  return (
    <Button
      onPress={onPress}
      buttonStyle={[
        buttonStyles.medium,
        backgroundColor != undefined && { backgroundColor },
      ]}
      textStyle={[textStyles.mediumButton]}
      disabled={disabled == true}
      title={title}
    />
  );
};

export default MediumButton;
