import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
}

// export const axiosInstance = axios.create({
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-API-KEY': process.env.api_key,
//   },
// });

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  }),
  options
);

export default client