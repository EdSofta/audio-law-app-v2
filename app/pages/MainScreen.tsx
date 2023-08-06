import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "../navigation/AppNavigator";

type Prop = {};

type Style = {};

const MainScreen: React.FC<Prop> = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <MainNavigator />
      </NavigationContainer>
    </View>
  );
};

const style = StyleSheet.create<Style>({});

export default MainScreen;
