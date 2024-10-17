import { useMutation } from '@tanstack/react-query'
import { useToast } from '@shared/modules/toast'
import { postApi } from '../api/api'
import { queryApi } from '@shared/api/queryApi'
import { ApiError } from '@shared/types'
import { IPost, UpdatePostDto } from '../types'

export const useUpdatePost = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateUpdatePost,
    isSuccess,
  } = useMutation<IPost, ApiError, UpdatePostDto>({
    mutationFn: postApi.update,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })
    },
    onSuccess: () => {
      openToast({
        type: 'warn',
        content: 'Successfully updated',
      })

      queryApi.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const updatePost = async (updateDto: UpdatePostDto) => {
    mutateUpdatePost(updateDto)
  }

  return {
    updatePost,
    isPending,
    isSuccess,
    error,
  }
}
