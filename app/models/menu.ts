import React from "react";

export type Menu = {
  title: string;
  leftIcon: React.FC;
  link: string | undefined;
  rightIcon: React.FC;
};
