// サインアップ
export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export type SignInParams = {
  email: string;
  password: string;
}

// パスワード再設定申請用パラメータ
export type PassResetParams = {
  email: string;
  redirect_url: string;
}

// パスワード再設定用パラメータ
export type PassResetPostParams = {
  password: string;
  passwordConfirmation: string;
}

// ユーザー
export type User = {
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
export type TokenParams = {
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
export type Message = {
  title: string;
  body: string;
  // image: File
}

// 友達リスト用

export type CustomersParams = {
  id: number;
  name: string;
  image?: string;
  userId: number;
  fullName: string;
  mail: string;
}

// チャット

export type Chats = {
  // id: number;
  body: string;
  image?: string;
  send_flg: number;
  line_customer_id: number;
}

export type UserInfo = {
  id: number;
  image?: string;
  name: string;
  user_id: number;
}

export type News = {
  id: string;
  publishedAt:  string;
  title: string;
  body?: HTMLElement;
  // createdAt: 2021-08-26T01:17:17.174Z,
  // updatedAt: 2021-08-26T01:17:17.174Z,
  // revisedAt: 2021-08-26T01:17:17.174Z,
}

export type Contents = {
  contents: News[];
}

export type Total = {
  total: number;
}

export type Chart = {
  data: { 
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      // borderWidth: number
    }[]
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

export type Tag = {
  groupId: number;
  groupName: string;
  editing: boolean;
  groupCount: number;
}

export type CurrentTag = {
  currentGroupsId: number;
  currentGroupsName: string;
}

export type GetTagsParams = {
  groupId: number
  groupName: string
  groupCount: number;
}

export type TabPanelProps = {
  index: number
  value: number
  userId: string
}

