import { AudioInfo } from "./audio.model";

export type AudioSession = {
  id: string;
  index: number;
  // playbackPosition: number;
  playlist: AudioInfo[];
};
