import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { User } from "../models/user.model";

const key = "authToken";

export const storeToken = async (authToken: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (e) {
    console.log("Error storing the auth token", e);
  }
};

export const getToken = async (): Promise<string | null | undefined> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.log("Error getting the auth token", e);
  }
};

export const getUser = async (): Promise<User | null> => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.log("Error deleting the auth token", e);
  }
};
