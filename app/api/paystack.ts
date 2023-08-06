import { CancelTokenSource } from "axios";
import { ApiResponse, create } from "apisauce";
import { IResponse } from "../models/response";
import { getUser } from "../auth/storage";
// @ts-ignore
// import { PAYSTACK_KEY, PAYSTACK_ENDPOINT } from "@env";

const PAYSTACK_KEY = "";
const PAYSTACK_ENDPOINT = ""

type PaystackAuth = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type PaystackPlan = {
  name: string;
  plan_code: string;
  description: string;
  amount: number;
  interval: string;
};

const client = create({
  baseURL: PAYSTACK_ENDPOINT,
  headers: {
    Authorization: `Bearer ${PAYSTACK_KEY}`,
  },
});

export const getPlans = async (
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<PaystackAuth>>> => {
  return client.get("/plan", {}, { cancelToken: cancelSource.token });
};

export const initiateSubApi = async (
  planId: string,
  cancelSource: CancelTokenSource
): Promise<ApiResponse<IResponse<PaystackAuth>>> => {
  const user = await getUser();
  return client.post(
    "/transaction/initialize",
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
