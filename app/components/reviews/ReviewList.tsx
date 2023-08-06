import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ReviewItem from "./ReviewItem";
import { Review } from "../../models/review.model";

type Prop = {
  theme?: string;
  audioId: string;
  customStyle?: StyleProp<ViewStyle>;
  reviews: Review[];
};

type Style = {};

const ReviewList: React.FC<Prop> = ({
  theme,
  audioId,
  customStyle,
  reviews,
}) => {
  return (
    <View style={[customStyle]}>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          theme={theme || ""}
          customStyle={{
            marginBottom: 15,
            backgroundColor: theme,
          }}
          review={review}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create<Style>({});

export default ReviewList;
