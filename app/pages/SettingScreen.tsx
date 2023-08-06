import React from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import useAuth from "../auth/useAuth";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu } from "../models/menu";
import MenuItem from "../components/MenuItem";
import Divider from "../components/Divider";
import routes from "../navigation/routes";
import ProfilePage, { style } from "../components/ProfilePage";

type Prop = {};

type Style = {
  body: ViewStyle;
};

const menu: Menu[] = [
  {
    title: "My Account",
    leftIcon: () => (
      <MaterialCommunityIcons name="account" size={26} color="#0E4F73" />
    ),
    link: routes.PROFILE,
    rightIcon: () => <Feather name="chevron-right" size={26} color="#0E4F73" />,
  },
  {
    title: "Change my password",
    leftIcon: () => <Entypo name="lock" size={26} color="#0E4F73" />,
    link: routes.CHANGE_PASSWORD,
    rightIcon: () => <Feather name="chevron-right" size={26} color="#0E4F73" />,
  },
  {
    title: "Subscription / Payment Details",
    leftIcon: () => <Feather name="credit-card" size={26} color="#0E4F73" />,
    link: routes.PAYMENT_INFO,
    rightIcon: () => <Feather name="chevron-right" size={26} color="#0E4F73" />,
  },
  {
    title: "Log Out",
    leftIcon: () => (
      <View
        style={{
          backgroundColor: "#C22D2D24",
          width: 33,
          height: 33,
          borderRadius: 17,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="log-out" size={24} color="#C22D2D" />
      </View>
    ),
    link: undefined,
    rightIcon: () => <Feather name="chevron-right" size={26} color="#0E4F73" />,
  },
];

const SettingScreen: React.FC<Prop> = () => {
  const { user, logout } = useAuth();

  const handleOnPress = (menu: Menu) => {
    if (menu.title == "Log Out") {
      logout();
    }
  };
  return (
    <ProfilePage>
      <FlatList
        contentContainerStyle={[style.body, defaultStyle.body]}
        data={menu}
        renderItem={({ item }) => (
          <MenuItem menu={item} onPress={handleOnPress} />
        )}
        keyExtractor={(item: Menu) => item.title}
        ItemSeparatorComponent={() => <Divider width="90%" />}
      />
    </ProfilePage>
  );
};

const defaultStyle = StyleSheet.create<Style>({
  body: {
    marginTop: 30,
    backgroundColor: "#FCFCFC",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: "100%",
    paddingVertical: 20,
    flexGrow: 1,
  },
});

export default SettingScreen;
