import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
// @ts-ignore
import Carousel, { Pagination } from 'bolusarz-react-native-snap-carousel';
import useAuth from '../auth/useAuth';
import Header from '../components/home/Header';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import { Feather } from '@expo/vector-icons';
import { textStyles } from '../config/styles';
import AudioSectionList from '../components/AudioSectionList';
import SubscriptionPrompt from '../components/modals/SubscriptionPrompt';
import { getFreeAudio, getRecentAudio } from '../repository/audio.repository';
import { CancelToken } from 'apisauce';
import { useApi } from '../hooks/useApi';
import { AudioInfo } from '../models/audio.model';
import routes from '../navigation/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeNavigator';
import { useNavigation } from '@react-navigation/native';
import cache from '../utils/cache';
import { audioByFreePlayApi, audioByRecentsApi } from '../api/audio';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const CAROUSEL_ITEMS = [
  require('../../assets/banner1.png'),
  require('../../assets/banner3.png'),
  require('../../assets/banner2.png'),
];

type Prop = {} & any;

type Style = {
  searchInput: ViewStyle;
  searchContainer: ViewStyle;
};

const HomeScreen: React.FC<Prop> = () => {
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const isCarousel: any = useRef();
  const {
    data: recentAudio,
    loading: recentLoading,
    request: requestRecentAudios,
  } = useApi<AudioInfo[]>(audioByRecentsApi);
  const {
    data: freeAudio,
    loading: freeLoading,
    request: requestFreeAudios,
  } = useApi<AudioInfo[]>(audioByFreePlayApi);

  const navigation = useNavigation();
  const { clear } = cache();

  const onRefresh = async () => {
    setRefreshing(true);
    await clear();
    const cancelToken = CancelToken.source();
    await Promise.all([
      requestFreeAudios(cancelToken),
      requestRecentAudios(cancelToken),
    ]);
    setRefreshing(false);
  };

  useEffect(() => {
    const cancelToken = CancelToken.source();
    requestFreeAudios(cancelToken);
    requestRecentAudios(cancelToken);
    return () => cancelToken.cancel();
  }, []);

  return (
    <Screen>
      <ScrollView
        style={{
          paddingHorizontal: 16,
          paddingTop: 20,
          height: '100%',
        }}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />
        <AppTextInput
          containerStyle={style.searchContainer}
          style={style.searchInput}
          placeholder="Search"
          placeholderTextColor="#D9D9D9"
          IconComponent={() => (
            <Feather
              name="search"
              size={24}
              color="#A0A0A0"
              style={{ marginLeft: 10 }}
            />
          )}
        />

        <Carousel
          data={CAROUSEL_ITEMS}
          renderItem={({ item }: any) => (
            <Image
              source={item}
              style={{
                height: 200,
                width: '100%',
              }}
              resizeMode="contain"
              borderRadius={10}
            />
          )}
          layout="default"
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          activeSlideAlignment="center"
          ref={isCarousel}
          onBeforeSnapToItem={(index: number) => setIndex(index)}
          autoplayInterval={10000}
          autoplay
          loop
        />
        <Pagination
          dotContainerStyle={{
            height: 5,
            width: 15,
            borderRadius: 5,
            backgroundColor: '#DADCDD',
          }}
          dotColor="#123155"
          inactiveDotColor="#DADCDD"
          dotsLength={3}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 25,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: '#123155',
          }}
          inactiveDotOpacity={0.4}
          tappableDots={true}
        />

        <AudioSectionList
          style={{ marginTop: 20 }}
          title="Listen Free"
          audioList={freeAudio || []}
          isLoading={freeLoading}
        />

        <AudioSectionList
          style={{ marginTop: 50 }}
          title="Recently Uploaded"
          audioList={recentAudio?.slice(0, 5) || []}
          color="#F9F4FF"
          isLoading={recentLoading}
          onSeeMore={() =>
            navigation.navigate(routes.CATEGORY, {
              screen: routes.CATEGORY_DETAILS,
              params: { category: 'recently' },
            })
          }
        />
      </ScrollView>
    </Screen>
  );
};

const style = StyleSheet.create<Style>({
  searchInput: { paddingVertical: 9, paddingLeft: 20, ...textStyles.body },
  searchContainer: {
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: '#FBFBFB',
  },
});

export default HomeScreen;
