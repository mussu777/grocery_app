import {Platform} from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000/api'
    : 'http://localhost:8000/api';
export const SOCKET_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

export const GOOGLE_MAP_API = 'Your_Google_Api_Key';

export const BRANCH_ID = '67f6134dd40ea85ea359839d';

// USE YOUR NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://172.20.10.4:3000/api'
// export const SOCKET_URL = 'http://172.20.10.4:3000'
