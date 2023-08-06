import { useCallback, useState } from 'react';
import { ApiResponse } from 'apisauce';

export const useApi = <T>(
  apiFunc: (...args: any[]) => Promise<ApiResponse<any>>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    const response = await apiFunc(...args);
    setLoading(false);
    if (response.ok) {
      setData(response.data.data);
    } else {
      setError(response.data?.message || response.problem);
    }
    return response;
  }, []);

  return {
    request,
    data,
    error,
    loading,
  };
};
