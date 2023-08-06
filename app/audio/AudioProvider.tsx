import React, { useEffect, useState } from 'react';
import {
  AudioContext,
  AudioContextType,
  PlaylistContext,
  PlaylistContextType,
} from './context';
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av';
import useAudio from './useAudio';
import { retrieveSession, saveSession } from './session';

type Prop = {};

const AudioProvider: React.FC<React.PropsWithChildren<Prop>> = ({
  children,
}) => {
  const [state, setState] = useState<AudioContextType>({
    isPlaying: false,
    isBuffering: false,
    playbackObj: new Audio.Sound(),
    updateState: () => {},
    duration: -1,
    playbackPosition: 0,
    soundObj: undefined,
    playlist: [],
    currentIndex: -1,
    isLooping: false,
  });

  const { playAt } = useAudio();

  const [playlistState, setPlaylistState] = useState<PlaylistContextType>({
    updatePlaylist: () => {},
    currentIndex: -1,
    playlist: [],
  });

  const playbackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        const session = await retrieveSession();
        const index =
          session?.playlist.findIndex((audio) => audio.id === session?.id) || 0;
        if (session) playAt(index, session.playlist);
      } else {
        updateState({
          playbackPosition: status.positionMillis,
          duration: status.durationMillis,
          soundObj: status,
          isBuffering: status.isBuffering,
          isPlaying: status.isPlaying,
        });
        if (status.positionMillis % 5000 === 0) {
          const session = await retrieveSession();
          if (session) {
            const audio = session.playlist.filter(
              (_, index) => index === session.index
            )[0];

            audio!!.lastPosition = status.positionMillis;
            const list = [
              ...session.playlist.filter((_, index) => index != session.index),
              audio!!,
            ];

            saveSession({
              playlist: list,
              index: session.index,
              id: list[session.index].id,
            });
          }
        }
      }
    }
  };

  const updateState = (newState: Partial<AudioContextType>) => {
    setState({
      ...state,
      ...newState,
    });
  };

  const updatePlaylist = (newState: Partial<PlaylistContextType>) => {
    const state = { ...playlistState, ...newState };
    setPlaylistState(state);
  };

  const resumeSession = async () => {
    try {
      const session = await retrieveSession();
      if (session) {
        setPlaylistState({
          currentIndex: session.index,
          playlist: session.playlist,
          updatePlaylist,
        });
        const selected = session.playlist[session.index];
        state.playbackObj?.loadAsync(
          { uri: selected.uri },
          {
            shouldPlay: false,
            progressUpdateIntervalMillis: 1000,
            positionMillis: selected.lastPosition,
          },
          false
        );
      }
    } catch (e) {
      console.error('Error from resume session', e);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
    state.playbackObj?.setOnPlaybackStatusUpdate(playbackStatusUpdate);
    !state.playbackObj?._loaded ? resumeSession() : null;
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        ...playlistState,
        updatePlaylist,
      }}
    >
      <AudioContext.Provider
        value={{
          ...state,
          playbackStatusUpdate: playbackStatusUpdate,
          updateState,
        }}
      >
        {children}
      </AudioContext.Provider>
    </PlaylistContext.Provider>
  );
};

export default AudioProvider;
