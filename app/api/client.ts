import { ApiResponse, create, Monitor } from 'apisauce';
import { getToken } from '../auth/storage';
// @ts-ignore
import { BASE_URL } from '@env';

const apiClient = create({
  baseURL:
    'http://ec2-13-40-213-192.eu-west-2.compute.amazonaws.com:8000/api/v1',
  timeout: 300000,
});

export const monitor: Monitor = (response: ApiResponse<any>) => {
  console.log({
    config: {
      method: response.config?.method,
      url: response.config?.url,
      headers: response.config?.headers,
      data: response.config?.data,
      baseUrl: response.config?.baseURL,
      payload: response.config?.params,
    },
    data: response.data,
    ok: response.ok,
    status: response.status,
    problem: response.problem,
  });
};

apiClient.addMonitor(monitor);

export default apiClient;
