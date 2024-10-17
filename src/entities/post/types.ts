import { FormDataAsset } from '@shared/types'

export interface IPost {
  id: number
  lat: number
  lng: number
  description: string
  photoUri: string
  userId: number
}

export interface UpdatePostDto {
  id: number

  description?: string
}

export interface CreatePostDto {
  description: string
  photo: FormDataAsset
  lat: number
  lng: number
  userId: number
}
export interface AddPostDto {
  description: string
  photo: string
  lat: number
  lng: number
  userId: number
}
