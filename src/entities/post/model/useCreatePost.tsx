import { useMutation } from '@tanstack/react-query'
import { CreatePostDto, IPost } from '../types'
import { useToast } from '@shared/modules/toast'
import { postApi } from '../api/api'
import { queryApi } from '@shared/api/queryApi'
import { ApiError } from '@shared/types'

export const useCreatePost = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateCreatePost,
    isSuccess,
  } = useMutation<IPost[], ApiError, CreatePostDto>({
    mutationFn: postApi.create,
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

  const createPost = async (createPostDto: CreatePostDto) => {
    mutateCreatePost(createPostDto)
  }

  return {
    createPost,
    isPending,
    isSuccess,
    error,
  }
}
