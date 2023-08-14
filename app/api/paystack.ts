import { CancelTokenSource } from 'axios';
import { ApiResponse, create } from 'apisauce';
import { IResponse } from '../models/response';
import { getUser } from '../auth/storage';
import { monitor } from './client';
import useAuth from '../auth/useAuth';
// @ts-ignore
// import { PAYSTACK_KEY, PAYSTACK_ENDPOINT } from "@env";

const PAYSTACK_KEY = 'sk_test_237f72d15cff229df0415a06a12909262cde6939';
const PAYSTACK_ENDPOINT = 'https://api.paystack.co';

type PaystackAuth = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type PaystackPlan = {
  id: string;
  name: string;
  plan_code: string;
  description: string;
  amount: number;
  interval: string;
  subscriptions: Array<{}>;
};

const client = create({
  baseURL: PAYSTACK_ENDPOINT,
  headers: {
    Authorization: `Bearer ${PAYSTACK_KEY}`,
  },
});

client.addMonitor(monitor);

export const getPlans = async (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<PaystackPlan[]>>> => {
  return client.get('/plan', {}, { cancelToken: cancelSource?.token });
};

export const getPlan = async (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<PaystackPlan>>> => {
  const user = await getUser();
  return client.get(
    `/plan/${user?.plan_id}`,
    {},
    { cancelToken: cancelSource.token }
  );
};

export const initiateSubApi = async (
  planId: string,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<PaystackAuth>>> => {
  const user = await getUser();
  return client.post(
    '/transaction/initialize',
    {
      email: user?.email,
      plan: planId,
      amount: 300000,
    },
    {
      cancelToken: cancelSource.token,
    }
  );
};

export const getCustomer = async (): Promise<ApiResponse<IResponse<any>>> => {
  const user = await getUser();
  return client.get(`/customer/${user?.email}`);
};
