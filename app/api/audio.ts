import { CancelTokenSource } from 'axios';
import { ApiResponse } from 'apisauce';
import { IResponse } from '../models/response';
import apiClient from './client';
import { AudioInfo } from '../models/audio.model';
import { Category } from '../models/category.model';

export const categoriesApi = (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<Category[]>>> => {
  return apiClient.get('', {}, { cancelToken: cancelSource.token });
};

export const likeAudio = (
  audioId: string,
  isLike: boolean,
  cancelSource?: CancelTokenSource
): Promise<ApiResponse<IResponse<any>>> => {
  return apiClient.post(
    `audio/${audioId}/like`,
    { like: isLike },
    { cancelToken: cancelSource?.token }
  );
};

export const audioByCategoryApi = (
  category: string,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<AudioInfo[]>>> => {
  return apiClient.get(
    `audio/category/${category}`,
    {},
    { cancelToken: cancelSource.token }
  );
};

export const getLikedAudioListApi = (
  cancelSource?: CancelTokenSource
): Promise<ApiResponse<IResponse<AudioInfo[]>>> => {
  return apiClient.get(
    `audio/favourites`,
    {},
    { cancelToken: cancelSource?.token }
  );
};

export const audioByRecentsApi = (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<AudioInfo[]>>> => {
  return apiClient.get(
    'audio/recently-played',
    {},
    { cancelToken: cancelSource.token }
  );
};

export const audioByFreePlayApi = (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<AudioInfo[]>>> => {
  return apiClient.get('audio/free', {}, { cancelToken: cancelSource.token });
};

export const audioInfoApi = (
  id: string,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<AudioInfo>>> => {
  return apiClient.get('', { id }, { cancelToken: cancelSource.token });
};
