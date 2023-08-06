import { Sound } from 'expo-av/build/Audio/Sound';
import { AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import { AudioInfo } from '../models/audio.model';
import { createContext } from 'react';

export type AudioContextType = {
  isPlaying: boolean; // Indicates whether the player is active or not
  isBuffering: boolean; // Indicates whether the player is buffering or not
  isLooping: boolean; // Indicates whether the audio is on a loop
  playbackObj?: Sound; // The player instance for playing sounds
  soundObj?: AVPlaybackStatusSuccess; // The status of the player instance after audio has been loaded
  duration: number;
  playbackPosition: number;
  playlist: Array<AudioInfo>; // An array of audio files to play
  currentIndex: number;
  playbackStatusUpdate?: (status: AVPlaybackStatus) => void;
  updateState: (state: Partial<AudioContextType>) => void;
};

export type PlaylistContextType = {
  playlist: Array<AudioInfo>; // An array of audio files to play
  currentIndex: number; // The currently playing index
  updatePlaylist: (newState: Partial<PlaylistContextType>) => void;
};

export const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  isBuffering: false,
  isLooping: false,
  duration: -1,
  playlist: [],
  currentIndex: -1,
  playbackPosition: 0,
  updateState: ({}) => {},
});

export const PlaylistContext = createContext<PlaylistContextType>({
  playlist: [],
  currentIndex: -1,
  updatePlaylist: () => {},
});
