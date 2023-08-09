import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { textStyles } from "../config/styles";
import { Rating } from "react-native-ratings";
import MediumButton from "./MediumButton";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

type Prop = {
  bgColor?: string;
  onSubmit?: (content: string, rating: number) => boolean | Promise<boolean>;
  isLoading?: boolean;
};

type Style = {};

const ReviewForm: React.FC<Prop> = ({ bgColor, onSubmit, isLoading }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const submit = async () => {
    const res = await onSubmit?.(content, rating);
    if (res) {
      setContent("");
      setRating(0);
    }
  };

  return (
    <View style={[style.container]}>
      <View style={style.rateContainer}>
        <Text style={style.rateText}>Tap to Rate:</Text>
        <Rating
          jumpValue={1}
          imageSize={30}
          startingValue={rating}
          onFinishRating={setRating}
        />
      </View>
      <View style={style.reviewContainer}>
        <FontAwesome
          name="pencil-square-o"
          size={20}
          color={colors.dark_blue}
        />
        <Text
          style={[style.rateText, { color: colors.dark_blue, marginLeft: 10 }]}
        >
          Write a Review
        </Text>
      </View>

      <TextInput
        placeholder="Your review"
        numberOfLines={7}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
        style={[
          textStyles.body,
          {
            width: "100%",
            backgroundColor: bgColor,
            borderRadius: 15,
            marginTop: 20,
            paddingVertical: 16,
            paddingHorizontal: 20,
            color: "black",
            marginBottom: 15,
          },
        ]}
      />
      {isLoading ?  <ActivityIndicator
          size="large"
          color={colors.dark_blue}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        /> : <MediumButton
        backgroundColor="#0E4F73"
        onPress={submit}
        title="Submit Review"
        disabled={!content || rating <= 0}
      />}
      
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  rateText: {
    fontFamily: "Montserrat_Medium",
    fontSize: 14,
    fontWeight: "500",
  },
  reviewContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "flex-start",
    paddingLeft: 5,
  },
});

export default ReviewForm;
