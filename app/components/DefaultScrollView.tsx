import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

type Prop = {
  bgColor?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
};

type Style = {};

const DefaultScrollView: React.FC<React.PropsWithChildren<Prop>> = ({
  bgColor,
  refreshing,
  onRefresh,
  children,
}) => {
  return (
    <ScrollView
      style={{
        backgroundColor: bgColor || "transparent",
        flex: 1,
      }}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingBottom: 70,
      }}
      nestedScrollEnabled
      refreshControl={
        <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};

const style = StyleSheet.create<Style>({});

export default DefaultScrollView;
