import { api } from '@shared/api/api'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'
import { IUser, UpdateMeDto, UpdateMeInfoDto } from '../types'
import { FormDataAsset, UploadFileResponse } from '@shared/types'

class UserApi {
  async getMe(): Promise<IUser> {
    const result = await api.get<IUser>('user/me')

    return result.data
  }

  async uploadMeAvatar(avatar: FormDataAsset): Promise<UploadFileResponse> {
    const formData = new FormData()
    formData.append('file', avatar)

    const result = await api.post<UploadFileResponse>('storage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return result.data
  }

  async updateMeInfo(updateDto: UpdateMeInfoDto) {
    const result = await api.put<IUser>('user/me', updateDto)

    return result.data
  }

  async getUserById(id: number): Promise<IUser> {
    const result = await api.get<IUser>('user/' + id)

    return result.data
  }
}
export const userApi = new UserApi()
