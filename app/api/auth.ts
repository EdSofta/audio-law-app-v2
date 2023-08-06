import { LoginDto } from '../models/login.dto';
import apiClient from './client';
import { ApiResponse } from 'apisauce';
import { RegisterDto } from '../models/register.dto';
import { CancelTokenSource } from 'axios';
import { ForgotPasswordDto } from '../models/forgot-password.dto';
import { IResponse } from '../models/response';

export const loginApi = (
  payload: LoginDto,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<{ token: string }>>> => {
  return apiClient.post('user/login', payload, {
    cancelToken: cancelSource.token,
  });
};

export const register = (
  payload: RegisterDto,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<any>>> => {
  return apiClient.post('user', payload, {
    cancelToken: cancelSource.token,
  });
};

export const forgotPassword = (
  payload: ForgotPasswordDto,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<any>> => {
  return apiClient.post('user/update-password', payload, {
    cancelToken: cancelSource.token,
  });
};
