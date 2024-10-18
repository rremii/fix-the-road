import { api } from '@shared/api/api'
import { UploadFileResponse } from '@shared/types'
import { AddPostDto, CreatePostDto } from '../types'
import { postApi } from './api'

class CreatePostSaga {
  photoResponse?: UploadFileResponse

  async execute({ photoUri, ...postInfo }: CreatePostDto) {
    try {
      this.photoResponse = await postApi.uploadPhoto(photoUri)
      if (!this.photoResponse) throw new Error('Could not upload photo')

      const addPostDto: AddPostDto = {
        ...postInfo,
        photo: this.photoResponse.fileName,
      }

      return await postApi.addPost(addPostDto)
    } catch (error) {
      console.log('Could not create Post', error)
      if (this.photoResponse) await this.rollBack(this.photoResponse?.fileName)

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
export const createPost = (dto: CreatePostDto) => {
  const saga = new CreatePostSaga()

  return saga.execute(dto)
}
