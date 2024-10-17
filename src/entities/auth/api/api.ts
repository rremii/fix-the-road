import { api } from '@shared/api/api'
import { AuthResponse, LoginDto, RegisterDto } from '../types'
import { DefaultApiResponse } from '@shared/api/types'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'

class AuthApi {
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('auth/login', loginDto)

    return response.data
  }

  async register({
    email,
    password,
    userName,
    avatar,
  }: RegisterDto): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('userName', userName)

    if (avatar && Platform.OS !== 'web') formData.append('avatar', avatar) //everytinh is fine //todo
    if (avatar && Platform.OS === 'web')
      formData.append('avatar', URIToFile(avatar.uri, avatar.name))

    const response = await api.post<AuthResponse>('auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async verifyCode(code: string) {
    const response = await api.post<DefaultApiResponse>('code/verify-code', {
      code,
    })
    return response.data
  }
  async sendCode(email: string) {
    const response = await api.post<DefaultApiResponse>('code/send-code', {
      email,
    })
    return response.data
  }

  async refresh(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>('auth/refresh')
    return response.data
  }
}
export const authApi = new AuthApi()
