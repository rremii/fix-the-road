import { useMutation } from '@tanstack/react-query'
import { CreatePostDto, IPost } from '../types'
import { useToast } from '@shared/modules/toast'
import { queryApi } from '@shared/api/queryApi'
import { ApiError } from '@shared/types'
import { createPost } from '../api/createPost.saga'
import { Platform } from 'react-native'
import { URIToFile } from '@shared/utils/URIToFile'

export const useCreatePost = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateCreatePost,
    isSuccess,
  } = useMutation<IPost[], ApiError, CreatePostDto>({
    mutationFn: createPost,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })
    },
    onSuccess: (data) => {
      if (!data) return
      openToast({
        type: 'warn',
        content: 'Successfully created',
      })

      queryApi.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const create = async (createPostDto: CreatePostDto) => {
    // let dto: CreatePostDto
    // if (Platform.OS === 'web') {
    //   dto = {
    //     ...createPostDto,
    //     photo: URIToFile(createPostDto.photo.uri, createPostDto.photo.name),
    //   }
    // } else {
    //   dto = createPostDto
    // }

    mutateCreatePost(createPostDto)
  }

  return {
    createPost: create,
    isPending,
    isSuccess,
    error,
  }
}
