import { AudioInfo } from "../models/audio.model";
import { Plan } from "../models/plan.model";
import { Category } from "../models/category.model";
import { Review } from "../models/review.model";

export const test_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkZXd1c2kgQm9sdXdhdGlmZSIsImlhdCI6MTUxNjIzOTAyMiwiaWQiOjEsInBob25lIjoiMDkwMjY1ODk0NTkiLCJlbWFpbCI6ImJvbHVzYXJ6QGdtYWlsLmNvbSJ9.vMPzi79s4CEU7X0uWG-EaDVKhtjqBOtZYDeO1EeYDEM";

export const audioFiles: AudioInfo[] = [
  {
    title: "Law Case 1",
    category: "Criminal Law",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 2",
    category: "Civil Law",
    uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 3",
    category: "Civil Law",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 4",
    category: "Criminal Law",
    uri: "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 5",
    category: "Criminal Law",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    // length: 25,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 6",
    category: "Criminal Law",
    uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 7",
    category: "Civil Law",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 8",
    category: "Civil Law",
    uri: "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 9",
    category: "Civil Law",
    uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
  {
    title: "Law Case 10",
    category: "Civil Law",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    // length: 20,
    lastPosition: 0,
    timestamps: [],
  },
];

export const reviews: Review[] = [
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
  {
    content: "Nice one!",
    user: "Ogunbowale Michael",
    dateCreated: "22 december 2022",
    rating: 4,
    audioId: ""
  },
];

export const categories: Category[] = [
  {
    title: "Constitutional Law",
    primaryColor: "#DBFDD3",
    secondaryColor: "#DBFDD3",
    imgUri: require("../../assets/icons8-civil-64.png"),
    backgroundUri : require("../../assets/category-banner.png"),
    slug: "constitutional",
    tertiaryColor: "rgba(250, 252, 255, 1)",
  },
  {
    title: "Criminal Law",
    primaryColor: "#FFDDE1",
    secondaryColor: "#FFDDE1",
    imgUri: require("../../assets/icons8-contract-64.png"),
    backgroundUri: require("../../assets/category-banner.png"),
    slug: "criminal",
    tertiaryColor: "rgba(227, 255, 250, 0.26)",
  },
  {
    title: "Civil Law",
    primaryColor: "#E3F0FF",
    secondaryColor: "#A1D1F9",
    imgUri: require("../../assets/icons8-law-book-64.png"),
    backgroundUri: require("../../assets/category-banner.png"),
    slug: "civil",
    tertiaryColor: "rgba(255, 239, 227, 0.26)",
  },
  {
    title: "Recently Added",
    primaryColor: "#F6E3FF",
    secondaryColor: "#DEBBEF",
    imgUri: require("../../assets/icons8-contract-64.png"),
    backgroundUri: require("../../assets/category-banner.png"),
    slug: "recently",
    tertiaryColor: "rgba(246, 227, 255, 0.26)",
  },
];
