import React, { useContext } from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AudioInfo } from "../models/audio.model";
import { textStyles } from "../config/styles";
import { AudioContext, PlaylistContext } from "../audio/context";
import { convertTime } from "../utils/helper";

type Prop = {
  audio: AudioInfo;
  bgColor: string;
  onPlay?: (audio: AudioInfo) => void;
  onPause?: (audio?: AudioInfo) => void;
};

type Style = {
  container: ViewStyle;
  image: ImageStyle;
};

const AudioItem: React.FC<Prop> = ({ audio, bgColor, onPlay, onPause }) => {
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const { isPlaying } = useContext(AudioContext);

  const currentAudio = playlist[currentIndex];

  return (
    <View
      style={{ ...style.container, backgroundColor: bgColor, marginBottom: 10 }}
    >
      <Image
        source={require("../../assets/headphones.png")}
        style={style.image}
      />
      <View>
        <Text
          style={{ ...textStyles.heading4, color: "#323232", marginBottom: 5 }}
        >
          {audio.title}
        </Text>
        {/*<Text*/}
        {/*  style={{ ...textStyles.small, color: "#323232", marginBottom: 5 }}*/}
        {/*>*/}
        {/*  {audio.category}*/}
        {/*</Text>*/}
        <Text style={{ ...textStyles.small, color: "#323232" }}>
          {convertTime((audio.duration || 0) * 1000)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          currentAudio?.id == audio?.id && isPlaying
            ? onPause?.(audio)
            : onPlay?.(audio)
        }
        style={{ flexDirection: "row", marginLeft: "auto" }}
      >
        <Image
          source={
            currentAudio?.id == audio?.id
              ? isPlaying
                ? require("../../assets/pause.png")
                : require("../../assets/play.png")
              : require("../../assets/play.png")
          }
          style={{ width: 24, height: 24, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create<Style>({
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginEnd: 27,
  },
  container: {
    paddingVertical: 13,
    flexDirection: "row",
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default AudioItem;
