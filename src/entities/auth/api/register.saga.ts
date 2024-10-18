import { api } from '@shared/api/api'
import { UploadFileResponse } from '@shared/types'
import { RegisterDto, RegisterUserDto } from '../types'
import { authApi } from './api'

class RegisterSaga {
  avatarResponse?: UploadFileResponse

  async execute({ avatarUri, ...userInfo }: RegisterDto) {
    try {
      if (avatarUri) this.avatarResponse = await authApi.uploadAvatar(avatarUri)

      const registerUserDto: RegisterUserDto = {
        ...userInfo,
        avatar: this.avatarResponse?.fileName || undefined,
      }

      return await authApi.registerUser(registerUserDto)
    } catch (error) {
      if (this.avatarResponse)
        await this.rollBack(this.avatarResponse?.fileName)
      throw error
    }
  }

  async rollBack(fileName: string) {
    try {
      await api.delete('storage/' + fileName)
    } catch (error) {
      console.log('Could not rollback create post saga', error)
    }
  }
}
export const register = (dto: RegisterDto) => {
  const saga = new RegisterSaga()

  return saga.execute(dto)
}
