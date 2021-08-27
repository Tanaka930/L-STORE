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
});

export default microClient