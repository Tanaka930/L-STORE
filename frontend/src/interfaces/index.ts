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

// パスワード再設定申請用パラメータ
export interface PassResetParams {
  email: string;
  redirect_url: string;
}

// パスワード再設定用パラメータ
export interface PassResetPostParams {
  password: string;
  passwordConfirmation: string;
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

// 友達リスト用

export interface CustomerList {
  id: number;
  name: string;
  image?: string;
  user_id: number;
  blockflg: number;
  full_name: string;
  mail: string;
}

// チャット

export interface Chats {
  // id: number;
  body: string;
  image?: string;
  send_flg: number;
  line_customer_id: number;
}

export interface UserInfo {
  id: number;
  image?: string;
  name: string;
  user_id: number;
}

export interface News {
  id: string;
  // createdAt: 2021-08-26T01:17:17.174Z,
  // updatedAt: 2021-08-26T01:17:17.174Z,
  publishedAt:  string;
  // revisedAt: 2021-08-26T01:17:17.174Z,
  title: string;
  body?: HTMLElement;
}

export interface Contents {
  contents: News[];
}

export type Total = {
  total: number;
}

export type Chart = {
  data: { 
          labels: string[]
          datasets: { label: string
                      data: number[]
                      backgroundColor: string
                      borderColor: string
                      // borderWidth: number
                    }[];
        }
}

export type Follower = {
  follow_count: number;
  gain_follow: number;
  gain_unfollow: number;
  pre_follow_count: number;
  pre_unfollow_count: number;
  unfollow_count: number;
  valid_account: number;
}