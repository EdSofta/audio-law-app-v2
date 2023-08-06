import React, { useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AudioInfo } from '../models/audio.model';
import TextButton from './TextButton';
import { textStyles } from '../config/styles';
import useAudio from '../audio/useAudio';
import { AudioContext, PlaylistContext } from '../audio/context';
import _ from 'lodash';
import colors from '../config/colors';
import { SubscribeContext } from '../subscribe/context';
import useAuth from '../auth/useAuth';
import { categories } from '../utils/constants';

type Prop = {
  style?: StyleProp<ViewStyle>;
  title: string;
  audioList: AudioInfo[];
  onSeeMore?: () => void;
  color?: string;
  isLoading?: boolean;
};

type Style = {
  header: ViewStyle;
  audio: ViewStyle;
  audioMeta: ViewStyle;
  thumbnailContainer: ViewStyle;
  thumbnail: ImageStyle;
};

const AudioSectionList: React.FC<Prop> = ({
  title,
  audioList,
  onSeeMore,
  style,
  color,
  isLoading,
}) => {
  const { loadPlaylist, playAt, resume, pause } = useAudio();
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const { setShowModal } = useContext(SubscribeContext);
  const { isPlaying } = useContext(AudioContext);
  const { user } = useAuth();

  const currentAudio = playlist[currentIndex];

  const handleOnPlay = (audio: AudioInfo) => {
    if (audioList) {
      const index = audioList.findIndex((a) => a.id == audio.id) || 0;
      if (audioList[index].isFree || user?.isSubscribed) {
        if (_.isEqual(audioList, playlist)) {
          if (currentAudio.id == audio.id) {
            return resume();
          }
          return playAt(index, audioList);
        }
        loadPlaylist(audioList || [], index);
      } else {
        setShowModal(true);
      }
    }
  };

  return (
    <View style={style}>
      <View style={defaultStyle.header}>
        <Text style={textStyles.heading4}>{title}</Text>
        {onSeeMore ? (
          <TextButton onPress={() => onSeeMore?.()} title="See More" />
        ) : null}
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.dark_blue}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      )}
      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        data={audioList}
        renderItem={({ item }) => (
          <View style={defaultStyle.audio}>
            <View
              style={[
                defaultStyle.thumbnailContainer,
                {
                  backgroundColor:
                    categories.find(
                      (category) => category.title === item.category
                    )?.primaryColor || '#F6FAFF',
                },
              ]}
            >
              <Image
                source={require('../../assets/headphones.png')}
                style={defaultStyle.thumbnail}
              />
            </View>
            <View style={defaultStyle.audioMeta}>
              <View>
                <Text style={[textStyles.heading4, { marginBottom: 5 }]}>
                  {item.title}
                </Text>
                <Text style={textStyles.body}>{item.category}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  currentAudio?.uri == item?.uri && isPlaying
                    ? pause()
                    : handleOnPlay(item)
                }
              >
                <Image
                  source={
                    currentAudio?.uri == item?.uri
                      ? isPlaying
                        ? require('../../assets/pause.png')
                        : require('../../assets/play.png')
                      : require('../../assets/play.png')
                  }
                  style={{ width: 24, height: 24, alignSelf: 'flex-end' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: 20, height: '100%' }}></View>
        )}
        horizontal
      />
    </View>
  );
};

const defaultStyle = StyleSheet.create<Style>({
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audio: {
    width: 183,
    height: 181,
  },
  audioMeta: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 17,
    backgroundColor: '#FAFCFF',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  thumbnailContainer: {
    width: '100%',
    flexGrow: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FAFF',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});

export default AudioSectionList;
