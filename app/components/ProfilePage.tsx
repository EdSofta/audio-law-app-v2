import React from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import useAuth from "../auth/useAuth";
import { textStyles } from "../config/styles";
import ImageButton from "../components/ImageButton";
import ScreenWithToolbar from "../components/ScreenWithToolbar";

type Prop = {};

type Style = {
  image: ImageStyle;
  defaultImage: ViewStyle;
  editBtn: ViewStyle;
  name: ViewStyle;
  email: ViewStyle;
  body: ViewStyle;
  input: ViewStyle;
  inputText: ViewStyle;
  heading: ViewStyle;
  subtitle: ViewStyle;
};

const ProfilePage: React.FC<React.PropsWithChildren<Prop>> = ({ children }) => {
  const { user } = useAuth();

  return (
    <ScreenWithToolbar
      style={{
        backgroundColor: "#0E4F73",
      }}
      iconTint="#fff"
    >
      {user ? (
        <View>
          <View
            style={{
              position: "relative",
              marginTop: 22,
            }}
          >
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} />
            ) : (
              <View style={style.defaultImage}>
                <Image
                  source={require("../../assets/default-image.png")}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
                <ImageButton
                  source={require("../../assets/edit.png")}
                  style={style.editBtn}
                  imgStyle={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            )}
          </View>
          <Text style={style.name}>{user.name}</Text>
          <Text style={style.email}>{user.email}</Text>
        </View>
      ) : (
        <View>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text style={style.heading}>Forgot Password</Text>
          <Text style={style.subtitle}>
            Lörem ipsum besk tett eurodektig koner. Kontratiligen oling doligen.
          </Text>
        </View>
      )}
      {children}
    </ScreenWithToolbar>
  );
};

export const style = StyleSheet.create<Style>({
  body: {
    backgroundColor: "#FCFCFC",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  defaultImage: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  editBtn: {
    position: "absolute",
    bottom: 5,
    right: 7,
  },
  email: {
    ...textStyles.small,
    marginTop: 5,
    color: "#CFE5FF",
    textAlign: "center",
  },
  heading: {
    ...textStyles.heading2,
    color: "#EBEBEB",
    textAlign: "center",
  },
  subtitle: {
    ...textStyles.body,
    textAlign: "center",
    width: 238,
    color: "#EBEBEB",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  image: {},
  input: {
    marginBottom: 20,
  },
  inputText: {
    color: "#8DA1A1",
  },
  name: {
    ...textStyles.heading4,
    marginTop: 15,
    color: "#CFE5FF",
    textAlign: "center",
  },
});

export default ProfilePage;
