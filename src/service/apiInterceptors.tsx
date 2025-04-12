import axios from 'axios';
import {BASE_URL} from './config';
import {refresh_tokens} from './authService';
import {Alert} from 'react-native';
import {tokenStorage} from '@state/storage';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

// Added a request interceptor to add the access token to the headers automatically
appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Added a response interceptor to handle 401 errors, refresh the token and retry the original request with the new token
appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('ERROR REFRESHING TOKEN');
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage =
        error.response.data.message || 'something went wrong';
      Alert.alert(errorMessage);
    }

    return Promise.resolve(error);
  },
);
