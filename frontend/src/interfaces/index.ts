// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

// トークン
export interface TokenParams {
  // id: number
  chanel_id: string;
  chanel_secret: string;
  messaging_token: string;
  login_token: string;
  // access_id: string
  // user_id: number
  // created_at: Date
  // updated_at: Date
}

// ユーザー
export interface Message {
  title: string;
  body: string;
  // image: File
}

// テスト用
export interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface UserLoginStatus {
  is_login: boolean;
  data: CustomerList[];
}

export interface CustomerList {
  id: number;
  line_costmer_id: number;
  body: string;
  image: IconImage;
  send_flg: string;
  created_at: string;
  updated_at: string;
}

export interface IconImage {
  url?: any;
}
