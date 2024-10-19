import axios from 'axios';
import { throttle } from 'lodash';

export const THROTTLE_TIME = 5000;

const getDataFromApi = async (url: string) => {
  const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  const response = await axiosClient.get(url);
  return response.data;
};

export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
