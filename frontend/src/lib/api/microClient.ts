import { createClient } from 'microcms-js-sdk';

type _Config = {
  apiKey: string;
}

const Config: _Config = {
  apiKey: process.env.REACT_APP_API_KEY || ""
}

export const microClient = createClient({
  serviceDomain: 'l-store',
  apiKey: Config.apiKey
  // apiKey: '47df9fe3-da48-42e6-ab02-f922ef9097ad'
});

// import axios from 'axios';

// export const axiosInstance = axios.create({
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-API-KEY': process.env.REACT_APP_API_KEY,
//   },
// });

export default microClient