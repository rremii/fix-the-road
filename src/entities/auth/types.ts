import { FormDataAsset } from '@shared/types'

export interface AuthResponse {
  accessToken: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  userName: string
  avatar?: FormDataAsset
}

export interface RegisterUserDto {
  email: string
  password: string
  userName: string
  avatar?: string
}
