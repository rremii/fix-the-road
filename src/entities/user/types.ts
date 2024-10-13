import { FormDataAsset } from '@shared/types'

export interface IUser {
  id: number
  userName: string
  email: string
  avatar?: string
}

export interface UpdateMeDto {
  id: number
  userName?: string
  avatar?: FormDataAsset
}
