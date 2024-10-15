import { create } from 'zustand'
import { CreatePostDto, IPost, UpdatePostDto } from '../types'
import { api } from '@shared/api/api'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'

class PostApi {
  async getAll(): Promise<IPost[]> {
    const result = await api.get<IPost[]>('post')

    return result.data
  }
  async getById(postId: number) {
    const result = await api.get<IPost>('post/' + postId)

    return result.data
  }

  async remove(postId: number) {
    const result = await api.delete<IPost>('post/' + postId)

    return result.data
  }

  async update(dto: UpdatePostDto) {
    const result = await api.put<IPost>('post', dto)

    return result.data
  }
  async create({ description, photo, lat, lng, userId }: CreatePostDto) {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('lat', lat.toString())
    formData.append('lng', lng.toString())
    formData.append('userId', userId.toString())
    formData.append(
      'photo',
      Platform.OS === 'web' ? URIToFile(photo.uri, photo.name) : photo,
    )
    const result = await api.post<IPost[]>('post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return result.data
  }
}

export const postApi = new PostApi()
