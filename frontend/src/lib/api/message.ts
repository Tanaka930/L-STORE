import client from 'lib/api/client'
import Cookies from 'js-cookie'
import { AxiosPromise } from 'axios'


export const postMessage = (params: FormData, groupId: string): AxiosPromise => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    }
  }
  return client.post(`messages/${groupId}/target_message`, params, config)
}
