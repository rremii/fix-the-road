import { api } from '@shared/api/api'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'
import { IUser, UpdateMeDto } from '../types'

class UserApi {
  async getMe(): Promise<IUser> {
    const result = await api.get<IUser>('user/me')

    return result.data
  }
  async updateMe({ id, userName, avatar }: UpdateMeDto): Promise<IUser> {
    const formData = new FormData()
    formData.append('id', id.toString())
    if (userName) formData.append('userName', userName)

    if (avatar && Platform.OS !== 'web') formData.append('avatar', avatar)
    if (avatar && Platform.OS === 'web')
      formData.append('avatar', URIToFile(avatar.uri, avatar.name))

    const result = await api.put<IUser>('user/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return result.data
  }

  async getUserById(id: number): Promise<IUser> {
    const result = await api.get<IUser>('user/' + id)

    return result.data
  }
}
export const userApi = new UserApi()
