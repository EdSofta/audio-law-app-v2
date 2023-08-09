import React, { useContext, useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AudioContext, PlaylistContext } from '../audio/context';
import useAudio from '../audio/useAudio';
import { textStyles } from '../config/styles';
import { EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import { categories } from '../utils/constants';

type Prop = {
  onClick: () => void;
};

const MiniAudioPlayer: React.FC<Prop> = ({ onClick }) => {
  const { playlist, currentIndex } = useContext(PlaylistContext);
  const { isPlaying, playbackObj, isBuffering } = useContext(AudioContext);
  const { previous, next, pause, resume } = useAudio();
  const category = useMemo(
    () =>
      categories.find((cat) => cat.title === playlist[currentIndex].category),
    [currentIndex, playlist]
  );

  return (
    <TouchableOpacity onPress={onClick} style={style.container}>
      <View
        style={[
          style.body,
          { backgroundColor: category?.primaryColor || '#DCECFF' },
        ]}
      >
        <View
          style={{
            paddingVertical: 19,
            paddingHorizontal: 28,
            backgroundColor: '#fff',
            marginRight: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={require('../../assets/headphones.png')}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <Text style={[textStyles.heading4, { color: '#555555', flexGrow: 1 }]}>
          {playlist[currentIndex].title}
        </Text>

        <Feather
          name="skip-back"
          size={20}
          color="black"
          style={style.actionBtn}
          onPress={previous}
        />
        {isPlaying ? (
          <Ionicons
            name="pause-circle-outline"
            size={24}
            color="black"
            style={[style.actionBtn, { opacity: isBuffering ? 0.5 : 1 }]}
            onPress={pause}
          />
        ) : (
          <EvilIcons
            name="play"
            size={24}
            color="black"
            style={style.actionBtn}
            onPress={resume}
          />
        )}

        <Feather
          name="skip-forward"
          size={20}
          color="black"
          style={style.actionBtn}
          onPress={next}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  actionBtn: {
    marginRight: 10,
  },
  container: {
    width: '100%',
    zIndex: 999999,
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
  },
  body: {
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: '#DCECFF',
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default MiniAudioPlayer;
