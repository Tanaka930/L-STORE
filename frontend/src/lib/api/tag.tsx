import client from 'lib/api/client';
import Cookies from 'js-cookie';
import { AxiosPromise } from 'axios';

// サインアップ（新規アカウント作成）
// export const postMessage = (params: Message) => {
export const postTag = (params: FormData): AxiosPromise => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  };
  return client.post('l_groups', params, config);
};
