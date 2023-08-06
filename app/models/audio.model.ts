export class AudioInfo {
  id: string = '';
  title: string = '';
  category: string = '';
  uri: string = '';
  duration: number = 0;
  lastPosition: number = 0;
  timestamps: TimeStamp[] = [];
  judge: string = '';
  isLiked?: boolean = false;
  isFree?: boolean = false;
}

export type TimeStamp = {
  title: string;
  start: number;
  end: number;
};
