// export const convertTime = (minutes: number): string => {
//   const hrs = minutes / 60;
//   const minute = hrs.toString().split(".")[0];
//   const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
//   const sec = Math.ceil((60 * percent) / 100);
//   if (parseInt(minute) < 10 && sec < 10) {
//     return `0${minute}:0${sec}`;
//   }
//
//   if (sec == 60) {
//     return `${minute + 1}:00`;
//   }
//
//   if (parseInt(minute) < 10) {
//     return `0${minute}:${sec}`;
//   }
//
//   if (sec < 10) {
//     return `${minute}:0${sec}`;
//   }
//
//   return `${minute}:${sec}`;
// };

export const convertTime = (millis: number): string => {
  const sec = Math.floor(millis / 1000) % 60;
  const minute = Math.floor(millis / 60000) % 60;
  const hrs = Math.floor(millis / 3600000);

  return `${hrs ? hrs.toString().padStart(2, '0') + ':' : ''}${minute
    .toString()
    .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export const getAudioBg = (category: string): string => {
  switch (category) {
    case 'Constitutional Law':
      return '#DBFDD3';
    case 'Criminal Law':
      return '#FFDDE1';
    case 'Civil Law':
      return '#E2EDFB';
    case 'Recently Added':
      return '#F6E3FF';
    default:
      return '#F6E3FF';
  }
};

export const formatNGN = (num: number) =>
  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
