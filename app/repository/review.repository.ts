import CacheHelper from "../utils/cache";
import { CancelTokenSource } from "axios";
import { Review } from "../models/review.model";
import { getReviewsApi } from "../api/review";

const { getItem, putItem } = CacheHelper();

const keys = {
  reviews: "review-",
};

export const getReviews = async (
  audioId: string,
  cancelSource?: CancelTokenSource
): Promise<any> => {
  const reviews = await getItem<Review[]>(keys.reviews + audioId);
  if (!reviews) {
    const res = await getReviewsApi(audioId, cancelSource);
    if (res.ok) {
      res.data?.data?.length && putItem(keys.reviews + audioId, res.data?.data);
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: reviews,
    message: "",
    ok: true,
  };
};

export const addNewReview = async (audioId: string, review: Review) => {
  const reviews = (await getItem<Review[]>(keys.reviews + audioId)) || [];
  reviews.push(review);
  putItem(keys.reviews + audioId, review);
  return reviews;
};
