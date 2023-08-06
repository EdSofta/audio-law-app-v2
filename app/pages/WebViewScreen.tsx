import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import ScreenWithToolbar from '../components/ScreenWithToolbar';

type Prop = NativeStackScreenProps<AppStackParamList, 'Webview'>;

type Style = {};

const WebViewScreen: React.FC<Prop> = ({ route }) => {
  const { url } = route.params;

  return (
    <ScreenWithToolbar>
      <WebView source={{ uri: url }}></WebView>
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create<Style>({});

export default WebViewScreen;
