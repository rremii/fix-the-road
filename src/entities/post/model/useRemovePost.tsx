import { useMutation } from '@tanstack/react-query'
import { useToast } from '@shared/modules/toast'
import { postApi } from '../api/api'
import { queryApi } from '@shared/api/queryApi'
import { ApiError } from '@shared/types'
import { IPost } from '../types'

export const useRemovePost = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateRemovePost,
    isSuccess,
  } = useMutation<IPost, ApiError, number>({
    mutationFn: postApi.remove,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: 'Could not remove post',
      })
    },
    onSuccess: () => {
      openToast({
        type: 'warn',
        content: 'Successfully Removed',
      })

      queryApi.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const removePost = async (postId: number) => {
    mutateRemovePost(postId)
  }

  return {
    removePost,
    isPending,
    isSuccess,
    error,
  }
}
