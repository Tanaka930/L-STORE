import client from "lib/api/client"
import Cookies from "js-cookie"
import { AxiosPromise } from "axios"
import { config } from "./config"
import { GetTagsParams } from "types/index"

// タグ追加用
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


// タグ一覧取得(表示)用
export const getTags = async (setTags: React.Dispatch<React.SetStateAction<GetTagsParams[]>>) => {
  try {
    const res = await client.get('l_groups', config)
    if (res.status === 200) {
      setTags(res.data.groupNameList)
    }
  } catch(err) {
    console.error(err)
  }
}
