import { useMutation, useQuery } from '@tanstack/react-query'
import { likeApi } from '../api/api'
import { ApiError } from '@shared/types'
import { useToast } from '@shared/modules/toast'
import { queryApi } from '@shared/api/queryApi'

export const useRemoveLike = (userId: number, postId: number) => {
  const {
    mutate: mutateRemoveLike,
    isPending,
    isSuccess,
    error,
  } = useMutation<void, ApiError, number>({
    mutationFn: likeApi.removeLike,
    onError: (error) => {
      if (!error) return
      console.log('like remove error', error)
    },
    onSuccess: () => {
      queryApi.invalidateQueries({ queryKey: ['likesinfo', userId, postId] })
    },
  })

  const removeLike = async (likeId: number) => {
    mutateRemoveLike(likeId)
  }

  return {
    removeLike,
    isPending,
    isSuccess,
    error,
  }
}
