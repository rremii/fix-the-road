export interface IUser {
  id: number
  userName: string
  email: string
  password: string
  avatar?: string
  refreshToken?: string
}

export interface IUserInfo {
  id: number
  userName: string
  email: string
  avatar?: string
}
