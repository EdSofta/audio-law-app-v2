import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenWithToolbar from '../components/ScreenWithToolbar';
import DefaultScrollView from '../components/DefaultScrollView';
import { textStyles } from '../config/styles';
import Slider from '@react-native-community/slider';
import ImageButton from '../components/ImageButton';
import colors from '../config/colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import { AudioContext, PlaylistContext } from '../audio/context';
import { convertTime } from '../utils/helper';
import useAudio from '../audio/useAudio';
import ReviewForm from '../components/ReviewForm';
import Transcript from '../components/Transcript';
import { categories } from '../utils/constants';
import ReviewList from '../components/reviews/ReviewList';
import { useApi } from '../hooks/useApi';
import { addNewReview, getReviews } from '../repository/review.repository';
import { Review } from '../models/review.model';
import { IResponse } from '../models/response';
import { submitReviewApi } from '../api/review';
import { CancelToken } from 'apisauce';
import cache from '../utils/cache';
import { likeAudio } from '../api/audio';
import Toast from 'react-native-root-toast';
import { Entypo } from '@expo/vector-icons';

type Prop = {};

const AudioScreen: React.FC<Prop> = () => {
  const { isPlaying, playbackPosition, duration, isBuffering } =
    useContext(AudioContext);

  const [refreshing, setRefreshing] = useState(false);

  const { currentIndex, playlist } = useContext(PlaylistContext);

  const { previous, next, pause, seek, resume } = useAudio();

  const currentAudio = useMemo(
    () => playlist[currentIndex],
    [playlist, currentIndex]
  );

  const [currentPosition, setCurrentPosition] = useState(0);

  const [isLiked, setIsLiked] = useState<boolean>(!!currentAudio.isLiked);

  const [reviews, setReviews] = useState<Review[]>([]);

  const { clear } = cache();

  const { request: likeAudioRequest } = useApi(likeAudio);

  const { request: requestReview, loading: requestsLoading } =
    useApi<Review[]>(getReviews);

  const { request: addReviewRequest, loading: addRequestLoading } =
    useApi<IResponse<Review>>(submitReviewApi);

  const handleOnLikeToggle = async () => {
    try {
      const res = await likeAudioRequest(currentAudio.id, !isLiked);
      if (res.ok) {
        if (isLiked) {
          Toast.show('Removed from your favourites');
        } else {
          Toast.show('Added to your favourites');
        }
        setIsLiked(!isLiked);
      } else {
        Toast.show(res.data?.message || res.problem);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const calculateSeekBar = () => {
    return playbackPosition / duration;
  };

  const onSlidingComplete = (value: number) => {
    seek(value * duration);
  };

  const category = useMemo(
    () =>
      categories.find((cat) => cat.title === playlist[currentIndex].category),
    [currentIndex, playlist]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await clear();
    requestReview(currentAudio.id).then((res) => {
      if (res.ok) {
        setReviews(res.data);
      }
      setRefreshing(false);
    });
  };

  const addReview = async (content: string, rating: number) => {
    const res = await addReviewRequest({
      content,
      rating,
      audioId: currentAudio.id,
      dateCreated: new Date().toUTCString(),
    });
    if (res.ok) {
      const newReviews = await addNewReview(currentAudio.id, res.data.data);
      setReviews(newReviews);
      return true;
    }
    return false;
  };

  useEffect(() => {
    requestReview(currentAudio.id).then((res) => {
      if (res.ok) {
        setReviews(res.data);
      }
    });
  }, []);

  return (
    <ScreenWithToolbar
      Icon={() => <Entypo name='chevron-down' size={25} color={'#000000'} />}
      title={currentAudio?.category}
    >
      <DefaultScrollView
        bgColor={colors.white}
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        <Text style={style.title}>{currentAudio?.title}</Text>
        <Text style={style.category}>{currentAudio?.category}</Text>

        <Transcript audio={currentAudio} />

        <Slider
          style={style.slider}
          minimumValue={0}
          step={0.001}
          maximumValue={1}
          value={calculateSeekBar()}
          tapToSeek={true}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="black"
          onValueChange={(value) => setCurrentPosition(value * duration)}
        />
        <View style={style.timeContainer}>
          <Text style={textStyles.small}>{convertTime(currentPosition)}</Text>
          <Text style={textStyles.small}>{convertTime(duration)}</Text>
        </View>
        <View style={{ height: 30 }}>
          {isBuffering ? (
            // <ActivityIndicator style={{ marginRight: "auto" }} />
            <Text style={textStyles.xsmall}>buffering....</Text>
          ) : null}
        </View>
        <View style={style.playControls}>
          <ImageButton
            source={require('../../assets/prev.png')}
            imgStyle={style.actionBtn}
            onPress={previous}
          />
          {duration == -1 ? (
            <ActivityIndicator />
          ) : (
            <ImageButton
              source={
                isPlaying
                  ? require('../../assets/pause.png')
                  : require('../../assets/play_filled.png')
              }
              imgStyle={style.actionBtn}
              style={style.playBtnContainer}
              onPress={() => (isPlaying ? pause() : resume())}
            />
          )}
          <ImageButton
            source={require('../../assets/next.png')}
            imgStyle={style.actionBtn}
            onPress={next}
          />
        </View>
        <View style={style.otherControls}>
          <Feather name="repeat" size={20} color="black" />
          <Pressable onPress={handleOnLikeToggle}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={20}
              color="black"
            />
          </Pressable>
        </View>

        <Text
          style={[
            textStyles.heading3,
            {
              color: colors.dark_blue,
              paddingHorizontal: 16,
              marginTop: 50,
              marginBottom: 30,
            },
          ]}
        >
          Ratings and Review
        </Text>
        <ReviewForm bgColor={category?.primaryColor} onSubmit={addReview} />
        <ReviewList
          theme={category?.primaryColor}
          audioId={currentAudio.id}
          customStyle={{
            marginTop: 40,
            paddingHorizontal: 16,
          }}
          reviews={reviews}
        />
      </DefaultScrollView>
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create({
  actionBtn: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
  },
  otherControls: {
    width: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  playBtnContainer: {
    padding: 23,
    backgroundColor: '#FAFCFF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playControls: {
    flexDirection: 'row',
    width: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  category: {
    ...textStyles.body,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 16,
    transform: [
      {
        scaleX: 1.08,
      },
    ],
  },
  topicContainer: {
    marginTop: 21,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  topicList: {
    marginTop: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    ...textStyles.heading4,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  thumbnailContainer: {
    width: '100%',
    height: 314,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F0FF',
    borderRadius: 20,
  },
  thumbnail: {
    width: 150,
    height: 131,
    resizeMode: 'cover',
  },
});

export default AudioScreen;
