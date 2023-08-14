import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import ScreenWithToolbar from '../components/ScreenWithToolbar';
import { textStyles } from '../config/styles';
import AudioItem from '../components/AudioItem';
import { audioFiles } from '../utils/constants';
import { AudioInfo } from '../models/audio.model';
import _ from 'lodash';
import useAudio from '../audio/useAudio';
import { PlaylistContext } from '../audio/context';
import { SubscribeContext } from '../subscribe/context';
import useAuth from '../auth/useAuth';
import { audioByCategoryApi, getLikedAudioListApi } from '../api/audio';
import { useApi } from '../hooks/useApi';

type Prop = {};

type Style = {};

const FavouritesScreen: React.FC<Prop> = () => {
  const { loadPlaylist, playAt, resume, pause } = useAudio();
  const { playlist, currentIndex } = useContext(PlaylistContext);

  const { setShowModal } = useContext(SubscribeContext);

  const currentAudio = playlist[currentIndex];
  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const {
    data: audioList,
    loading: audioListLoading,
    request: requestAudioList,
  } = useApi<AudioInfo[]>(getLikedAudioListApi);

  const handleOnPlay = (audio: AudioInfo) => {
    if (audioList) {
      const index = audioList.findIndex((a) => a.uri == audio.uri);
      if (audioList[index].isFree || user?.subscribed) {
        if (_.isEqual(audioFiles, playlist)) {
          if (currentAudio.uri == audio.uri) {
            return resume();
          }
          return playAt(index, audioList || []);
        }
        loadPlaylist(audioList || [], index);
      } else {
        setShowModal(true);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await requestAudioList();
    setRefreshing(false);
  };

  useEffect(() => {
    requestAudioList();
  }, []);

  return (
    <ScreenWithToolbar>
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={[textStyles.heading3, { marginTop: 20, marginBottom: 15 }]}
        >
          Favorites
        </Text>
        {audioList ? (
          audioList?.map((value, index) => (
            <AudioItem
              audio={value}
              key={index}
              bgColor="#FAFCFF"
              onPlay={(audio) => handleOnPlay(audio)}
              onPause={() => pause()}
            />
          ))
        ) : (
          <></>
        )}
      </ScrollView>
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create<Style>({});

export default FavouritesScreen;
