import { useContext } from 'react';
import { AudioContext, PlaylistContext } from './context';
import { AudioInfo } from '../models/audio.model';
import { saveSession } from './session';

const useAudio = () => {
  const { currentIndex, playlist, updatePlaylist } =
    useContext(PlaylistContext);

  const {
    isPlaying,
    playbackObj,
    updateState,
    playbackPosition,
    playbackStatusUpdate,
  } = useContext(AudioContext);

  const loadPlaylist = async (list: Array<AudioInfo>, indexToPlay: number) => {
    const selected = list[indexToPlay];
    try {
      await reset();

      updatePlaylist({
        playlist: list,
        currentIndex: indexToPlay,
      });

      saveSession({
        playlist: list,
        index: indexToPlay,
        id: list[indexToPlay].id,
      });

      updateState({
        isPlaying: true,
      });

      if (selected.uri) await play(selected.uri);
      else await play(selected.uri, selected.lastPosition);
    } catch (e) {
      console.error(e);
    }
  };

  const playAt = async (index: number, playlist: Array<AudioInfo>) => {
    console.log(index);
    const selected = playlist[index];
    try {
      await reset();
      await play(selected.uri);
      console.log('Playing ', selected.uri);
      updatePlaylist({
        currentIndex: index,
        playlist,
      });
      saveSession({
        playlist,
        index,
        id: playlist[index].id,
      });
      updateState({
        duration: -1,
        playbackPosition: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const resume = async () => {
    if (playbackObj?._loaded)
      playbackObj?.playFromPositionAsync(playbackPosition);
    updateState({
      isPlaying: true,
    });
  };

  const play = async (uri: string, playbackPosition: number = 0) => {
    await playbackObj?.loadAsync(
      { uri },
      {
        shouldPlay: true,
        progressUpdateIntervalMillis: 1000,
        positionMillis: playbackPosition,
      },
      false
    );
  };

  const pause = async () => {
    if (playbackObj?._loaded) playbackObj?.pauseAsync();
    updateState({
      isPlaying: false,
    });
  };

  const previous = async () => {
    if (currentIndex > 0) {
      playAt(currentIndex - 1, playlist);
    }
  };

  const next = async () => {
    if (currentIndex < playlist.length) {
      await playAt(currentIndex + 1, playlist);
    } else {
      updateState({
        isPlaying: false,
      });
    }
  };

  const seek = async (time: number) => {
    if (isPlaying) playbackObj?.playFromPositionAsync(time);
    else updateState({ playbackPosition: time });
  };

  const loop = async (repeat: boolean) => {
    playbackObj?.setIsLoopingAsync(repeat);
    updateState({ isLooping: repeat });
  };

  const reset = async () => {
    if (isPlaying && playbackObj?._loaded) {
      await playbackObj?.stopAsync();
    }
    if (playbackObj?._loaded || playbackObj?._loading) {
      await playbackObj?.stopAsync();
      await playbackObj?.unloadAsync();
    }
  };

  return {
    loadPlaylist,
    play,
    pause,
    previous,
    next,
    seek,
    resume,
    playAt,
    loop,
  };
};

export default useAudio;
