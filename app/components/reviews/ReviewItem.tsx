import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Review } from "../../models/review.model";
import { Rating } from "react-native-ratings";
import { format } from "date-fns";
import { textStyles } from "../../config/styles";

type Prop = {
  review: Review;
  customStyle: StyleProp<ViewStyle>;
  theme: string;
};

type Style = {
  container: ViewStyle;
  header: ViewStyle;
  content: ViewStyle;
};

const ReviewItem: React.FC<Prop> = ({ review, customStyle, theme }) => {
  return (
    <View style={[style.container, customStyle]}>
      <View style={style.header}>
        <View
          style={{
            overflow: "hidden",
          }}
        >
          <Text
            style={[
              textStyles.body,
              {
                fontFamily: "Montserrat_Bold",
              },
            ]}
          >
            {review.user}
          </Text>
          <Rating
            jumpValue={1}
            imageSize={14}
            startingValue={review.rating}
            readonly
            style={{
              justifyContent: "flex-start",
              marginLeft: -10,
              marginTop: 5,
            }}
            tintColor={theme}
          />
        </View>
        <Text style={[textStyles.body]}>
          {format(new Date(review.dateCreated), "d, MMM yyyy")}
        </Text>
      </View>
      <Text style={[style.content, textStyles.body]}>{review.content}</Text>
    </View>
  );
};

const style = StyleSheet.create<Style>({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 20,
  },
});

export default ReviewItem;
