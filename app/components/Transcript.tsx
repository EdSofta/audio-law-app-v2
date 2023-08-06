import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { textStyles } from "../config/styles";
import { AudioInfo } from "../models/audio.model";
import { convertTime, getAudioBg } from "../utils/helper";
import { AudioContext, PlaylistContext } from "../audio/context";
import useAudio from "../audio/useAudio";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TimeStamp } from "../models/audio.model";
import { categories } from "../utils/constants";

type Prop = {
  audio: AudioInfo;
};

const TopicItem: React.FC<{
  item: TimeStamp;
  active: boolean;
  onPress: (item: TimeStamp) => void;
}> = ({ active, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
      }}
      onPress={() => onPress(item)}
    >
      <Text
        style={[
          textStyles.small,
          { marginBottom: 5, fontWeight: active ? "bold" : "normal" },
        ]}
      >
        {item.title}{" "}
        <Text
          style={{
            fontFamily: "Montserrat_Bold",
          }}
        >
          ({convertTime(item.start)} - {convertTime(item.end)})
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const Transcript: React.FC<Prop> = ({ audio }) => {
  const { seek } = useAudio();
  const { playbackPosition } = useContext(AudioContext);
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const category = useMemo(
    () =>
      categories.find((cat) => cat.title === playlist[currentIndex].category),
    [currentIndex, playlist]
  );

  const handleTimeStampSelected = (timestamp: TimeStamp) => {
    seek(parseFloat(timestamp.start.toString()));
  };

  useLayoutEffect(() => {
    const index = audio.timestamps.findIndex(
      (stamp) =>
        stamp.start <= playbackPosition && stamp.end >= playbackPosition
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
    try {
      listRef.current?.scrollToIndex({ animated: true, index });
    } catch (e) {
      // console.log(e);
    }
  }, [playbackPosition]);

  return (
    <View
      style={[style.container, { backgroundColor: category?.primaryColor }]}
    >
      <Text
        style={[
          textStyles.heading4,
          { marginBottom: 35, paddingHorizontal: 16 },
        ]}
      >
        Judge: {audio.judge}
      </Text>
      <Text
        style={[
          textStyles.body,
          textStyles.medium,
          { marginBottom: 17, paddingHorizontal: 16 },
        ]}
      >
        <FontAwesome5 name="book-open" size={20} color="#0E4F73" />
        {"  "}Topics Discussed:
      </Text>

      {audio?.timestamps ? (
        <View style={style.topicList}>
          <FlatList
            data={audio.timestamps}
            ref={listRef}
            renderItem={({ item, index }) => (
              <TopicItem
                item={item}
                onPress={handleTimeStampSelected}
                active={activeIndex === index}
              />
            )}
            keyExtractor={(item) => item.title}
            scrollEnabled
            nestedScrollEnabled
          />
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 40,
  },
  topicList: {
    height: 250,
    paddingLeft: 16,
  },
});

export default Transcript;
