import { AddPostDto, CreatePostDto, IPost, UpdatePostDto } from '../types'
import { api } from '@shared/api/api'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'
import { FormDataAsset, UploadFileResponse } from '@shared/types'

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

  async uploadPhoto(photo: FormDataAsset) {
    const formData = new FormData()
    formData.append('file', photo)

    const result = await api.post<UploadFileResponse>('storage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return result.data
  }

  async addPost(addPostDto: AddPostDto) {
    const result = await api.post<IPost[]>('post', addPostDto)

    return result.data
  }
}

export const postApi = new PostApi()
