import { CancelTokenSource } from "axios";
import { Review } from "../models/review.model";
import { ApiResponse } from "apisauce";
import { IResponse } from "../models/response";
import apiClient from "./client";

export const submitReviewApi = (
  review: Review,
  cancelSource?: CancelTokenSource
): Promise<ApiResponse<IResponse<Review>>> => {
  return apiClient.post("review", review, { cancelToken: cancelSource?.token });
};

export const getReviewsApi = (
  audioId: string,
  cancelSource?: CancelTokenSource
): Promise<ApiResponse<IResponse<Review[]>>> => {
  return apiClient.get(
    "review",
    { audioId },
    { cancelToken: cancelSource?.token }
  );
};
