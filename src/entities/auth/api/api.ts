import { api } from '@shared/api/api'
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  RegisterUser,
  RegisterUserDto,
} from '../types'
import { DefaultApiResponse } from '@shared/api/types'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'
import { FormDataAsset, UploadFileResponse } from '@shared/types'

class AuthApi {
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('auth/login', loginDto)

    return response.data
  }

  async uploadAvatar(avatarUri: string) {
    const formData = new FormData()

    const avatar = await URIToFile(avatarUri, 'avatar')
    formData.append('file', avatar)

    const response = await api.post<UploadFileResponse>('storage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async registerUser(registerDto: RegisterUserDto) {
    const response = await api.post<AuthResponse>('auth/register', registerDto)
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
