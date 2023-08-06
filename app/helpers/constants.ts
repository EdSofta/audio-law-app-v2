import { AudioInfo } from "../models/audio.model";

export const genPlaylist = (category: string): AudioInfo[] => {
  return [
    {
      id: "",
      title: "Audio 0",
      uri: "https://audio-law-files.s3.eu-west-2.amazonaws.com/Mekwunye+vs+Emirates+Mixdown_mixdown.mp3",
      category: category,
      lastPosition: 0,
      timestamps: [
        {
          title: "Principles guiding appeal of",
          start: 794,
          end: 1020,
        },
        {
          title: "Nature of",
          start: 1254,
          end: 1358,
        },
        {
          title: "Assessment of general damages in Air Carriage Contract",
          start: 1359,
          end: 1808,
        },
        {
          title: "When granted and the purpose of general damages",
          start: 1821,
          end: 1860,
        },
        {
          title: "Effect of Breach",
          start: 1917,
          end: 1980,
        },
        {
          title:
            "Whether can avail airline for breach of fundamental term of contract",
          start: 2066,
          end: 2160,
        },
        {
          title:
            "Duty of Court to prevent party from evading contractual obligation by using wrong doing",
          start: 2246,
          end: 2290,
        },
        {
          title: "Existence of authority to act as agent, when existent",
          start: 2400,
          end: 2654,
        },
      ],
    },
    {
      id: "",
      title: "Audio 1",
      uri: "https://audio-law-files.s3.eu-west-2.amazonaws.com/Nomayo+Mixdown_mixdown.mp3",
      category: category,
      lastPosition: 0,
      timestamps: [],
    },
    {
      id: "",
      title: "Audio 2",
      uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
      category: category,
      lastPosition: 0,
      timestamps: [],
    },
    {
      id: "",
      title: "Audio 3",
      uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
      category: category,
      lastPosition: 0,
      timestamps: [],
    },
    {
      id: "",
      title: "Audio 4",
      uri: "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
      category: category,
      lastPosition: 0,
      timestamps: [],
    },
  ];
};
