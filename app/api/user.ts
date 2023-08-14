import { ChangePasswordDto } from '../models/change-password.dto';
import { CancelTokenSource } from 'axios';
import { ApiResponse } from 'apisauce';
import { IResponse } from '../models/response';
import apiClient from './client';
import { ForgotPasswordDto } from '../models/forgot-password.dto';
import { User } from '../models/user.model';

export const changePasswordApi = (
  payload: ChangePasswordDto,
  cancelToken?: CancelTokenSource
): Promise<ApiResponse<IResponse<{ message: string }>>> => {
  return apiClient.post('', payload, { cancelToken: cancelToken?.token });
};

export const forgotPasswordApi = (
  payload: ForgotPasswordDto,
  cancelToken?: CancelTokenSource
): Promise<ApiResponse<IResponse<{ message: string }>>> => {
  return apiClient.post('', payload, { cancelToken: cancelToken?.token });
};

export const updateProfileApi = (
  payload: User,
  cancelToken?: CancelTokenSource
): Promise<ApiResponse<IResponse<{ message: string; token: string }>>> => {
  return apiClient.put('user', payload, { cancelToken: cancelToken?.token });
};

export const checkSubscription = (payload: {
  customer_id: string;
  plan_id: string;
}): Promise<ApiResponse<IResponse<string>>> => {
  return apiClient.post('user/subscribe', payload);
};

export const cancelSubscription = (): Promise<
  ApiResponse<IResponse<string>>
> => {
  return apiClient.post('user/unsubscribe');
};
