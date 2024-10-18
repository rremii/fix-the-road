import { api } from '@shared/api/api'
import { IUser, UpdateMeDto, UpdateMeInfoDto } from '../types'
import { FormDataAsset, UploadFileResponse } from '@shared/types'
import { userApi } from './api'

class UpdateMeSaga {
  avatarResponse?: UploadFileResponse

  async execute({ id, avatarUri, userName }: UpdateMeDto) {
    try {
      if (avatarUri)
        this.avatarResponse = await userApi.uploadMeAvatar(avatarUri)

      const updateMeDto: UpdateMeInfoDto = {
        id,
        avatar: this.avatarResponse?.fileName || undefined,
        userName,
      }

      return await userApi.updateMeInfo(updateMeDto)
    } catch (error) {
      console.log('Could not update me', error)

      if (this.avatarResponse)
        await this.rollBack(this.avatarResponse?.fileName)

      throw error
    }
  }

  async rollBack(fileName: string) {
    try {
      await api.delete('storage/' + fileName)
    } catch (error) {
      console.log('Could rollback update me saga', error)
    }
  }
}
export const updateMe = (dto: UpdateMeDto) => {
  const saga = new UpdateMeSaga()

  return saga.execute(dto)
}
