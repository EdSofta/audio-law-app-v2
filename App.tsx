import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import AuthNavigator from './app/navigation/AuthNavigator';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getToken, getUser, removeToken } from './app/auth/storage';
import { User } from './app/models/user.model';
import { AuthContext } from './app/auth/context';
import AppNavigator from './app/navigation/AppNavigator';
import apiClient from './app/api/client';
import navigationTheme from './app/navigation/navigationTheme';
import AudioProvider from './app/audio/AudioProvider';
import routes from './app/navigation/routes';
import MiniAudioPlayer from './app/components/MiniAudioPlayer';
import { PlaylistContext } from './app/audio/context';
import useAuth from './app/auth/useAuth';
import SubscriptionPrompt from './app/components/modals/SubscriptionPrompt';
import { SubscribeContext } from './app/subscribe/context';

SplashScreen.preventAutoHideAsync();

const exclude = [
  routes.LOGIN,
  routes.REGISTER,
  routes.SETTING_INDEX,
  routes.SETTING,
  routes.WEBVIEW,
  routes.AUDIO,
  routes.FORGOT_PASSWORD,
  routes.CHANGE_PASSWORD,
  routes.PAYMENT_INFO,
  routes.PROFILE,
];

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const { user } = useAuth();
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const [audioVisible, setAudioVisible] = useState(false);
  const { showModal, setShowModal } = useContext(SubscribeContext);
  const updateState = () => {
    if (navigationRef.isReady()) {
      setAudioVisible(
        !exclude.includes(navigationRef.getCurrentRoute()?.name || '/') &&
          playlist.length > 0
      );
    }
    // navigationRef.current
  };

  useEffect(() => {
    updateState();
  }, [playlist]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          theme={navigationTheme}
          onStateChange={updateState}
        >
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        {audioVisible ? (
          <MiniAudioPlayer
            onClick={() => navigationRef.navigate(routes.AUDIO)}
          />
        ) : null}
      </View>
      <SubscriptionPrompt
        show={showModal}
        close={() => setShowModal(false)}
        subscribe={() => {
          navigationRef.navigate(routes.SETTING, {
            screen: routes.PAYMENT_INFO,
          });
          setShowModal(false);
        }}
      />
    </>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/poppins.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Semi_Bold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    Montserrat_Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_Extra_Bold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    Montserrat_Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
  });

  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showSubscribeModal, setshowSubscribeModal] = useState(false);

  const restoreUser = async () => {
    const user = await getUser();
    setUser(user);
    setIsReady(true);
  };

  apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await getToken();
    if (!authToken) return;
    request.headers.Authorization = `Bearer ${authToken}`;
  });

  apiClient.addAsyncResponseTransform(async (response) => {
    if (response.status === 401) {
      removeToken();
      setUser(null);
    }
  });

  const handleOnLayout = useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  useEffect(() => {
    restoreUser();
  }, []);

  if (!(fontsLoaded && isReady)) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={handleOnLayout}>
      <RootSiblingParent>
        <AuthContext.Provider value={{ user, setUser }}>
          <SubscribeContext.Provider
            value={{
              showModal: showSubscribeModal,
              setShowModal: setshowSubscribeModal,
            }}
          >
            <AudioProvider>
              <Main />
            </AudioProvider>
          </SubscribeContext.Provider>
        </AuthContext.Provider>
      </RootSiblingParent>
    </View>
  );
}
