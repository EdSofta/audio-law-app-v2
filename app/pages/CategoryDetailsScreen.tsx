import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CategoryStackParamList } from '../navigation/CategoryNavigator';
import ScreenWithToolbar from '../components/ScreenWithToolbar';
import DefaultScrollView from '../components/DefaultScrollView';
import { textStyles } from '../config/styles';
import { Category } from '../models/category.model';
import AudioItem from '../components/AudioItem';
import colors from '../config/colors';
import useAudio from '../audio/useAudio';
import { genPlaylist } from '../helpers/constants';
import { PlaylistContext } from '../audio/context';
import { AudioInfo } from '../models/audio.model';
import _ from 'lodash';
import ImageButton from '../components/ImageButton';
import { useApi } from '../hooks/useApi';
import { categories } from '../utils/constants';
import routes from '../navigation/routes';
import { CancelToken } from 'apisauce';
import cache from '../utils/cache';
import useAuth from '../auth/useAuth';
import { SubscribeContext } from '../subscribe/context';
import { audioByCategoryApi } from '../api/audio';

type Prop = NativeStackScreenProps<
  CategoryStackParamList,
  'CategoryDetails',
  'Category'
>;

type Style = {
  banner: ImageStyle;
  header: ViewStyle;
  divider: ViewStyle;
};

const CategoryDetailsScreen: React.FC<Prop> = ({ route, navigation }) => {
  const { category: slug } = route.params;
  const [category, setCategory] = useState<Category>();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: audioList,
    loading: audioListLoading,
    request: requestAudioList,
  } = useApi<AudioInfo[]>(audioByCategoryApi);
  const { loadPlaylist, playAt, resume, pause } = useAudio();
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const { setShowModal } = useContext(SubscribeContext);

  const currentAudio = playlist[currentIndex];

  const [list, setList] = useState<Array<AudioInfo>>([]);

  const { clear } = cache();

  const { user } = useAuth();

  const handleOnPlay = (audio: AudioInfo) => {
    if (audioList) {
      const index = audioList?.findIndex((a) => a.id == audio.id) || 0;
      if (audioList[index].isFree || user?.isSubscribed) {
        if (_.isEqual(audioList, playlist)) {
          if (currentAudio.id == audio.id) {
            return resume();
          }
          return playAt(index, list);
        }
        loadPlaylist(audioList || [], index);
      } else {
        setShowModal(true);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const cancelToken = CancelToken.source();
    await clear();
    await requestAudioList(slug, cancelToken);
    setRefreshing(false);
  };

  useEffect(() => {
    const cancelToken = CancelToken.source();
    const cat = categories.find((category) => category.slug === slug);
    setCategory(cat);
    requestAudioList(slug, cancelToken);
    return () => cancelToken.cancel();
  }, []);

  return (
    <ScreenWithToolbar>
      <DefaultScrollView
        refreshing={refreshing}
        onRefresh={onRefresh}
        bgColor={colors.white}
      >
        {category && (
          <View style={{ flex: 1 }}>
            <View
              style={[
                style.banner,
                {
                  backgroundColor: category.secondaryColor,
                },
              ]}
            >
              <Image
                source={require('../../assets/headphones.png')}
                style={{ marginTop: -60 }}
              />
              <View style={style.header}>
                <View
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <Text
                    style={{
                      ...textStyles.body,
                      fontFamily: 'Montserrat_Semi_Bold',
                      color: '#fff',
                    }}
                  >
                    {category.title}
                  </Text>
                  <Text
                    style={{
                      ...textStyles.small,
                      color: '#fff',
                      marginTop: 5,
                    }}
                  >
                    Play Now
                  </Text>
                </View>

                <ImageButton
                  imgStyle={style.playBtn}
                  source={require('../../assets/play.png')}
                  onPress={() => handleOnPlay(list[0])}
                />
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 16,
              }}
            >
              {audioListLoading && (
                <ActivityIndicator
                  size="large"
                  color={colors.dark_blue}
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              )}
              {audioList?.map((value, index) => (
                <AudioItem
                  audio={value}
                  key={index}
                  bgColor={category.tertiaryColor}
                  onPlay={(audio) => handleOnPlay(audio)}
                  onPause={() => pause()}
                />
              ))}
            </View>
          </View>
        )}
      </DefaultScrollView>
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create({
  banner: {
    height: 330,
    marginBottom: 20,
    position: 'relative',
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  divider: {
    width: '82%',
    height: 3,
    borderRadius: 5,
    marginBottom: 15,
  },
  header: {
    width: '90%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#0E4F73',
    position: 'absolute',
    bottom: 0,
    left: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playBtn: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default CategoryDetailsScreen;
