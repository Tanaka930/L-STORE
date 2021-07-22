// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

// トークン
export interface TokenParams {
  // id: number
  chanel_id: string
  chanel_secret: string
  messaging_token: string
  login_token: string
  // access_id: string
  // user_id: number
  // created_at: Date
  // updated_at: Date
}
  
// ユーザー
export interface Message {
  title: string
  body: string
  // image: File
}