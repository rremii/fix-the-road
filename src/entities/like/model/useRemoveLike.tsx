import { useMutation, useQuery } from '@tanstack/react-query'
import { likeApi } from '../api/api'
import { ApiError } from '@shared/types'
import { useToast } from '@shared/modules/toast'
import { queryApi } from '@shared/api/queryApi'
import { ILike, RemoveLikeDto } from '../types'

export const useRemoveLike = () => {
  const {
    mutate: mutateRemoveLike,
    isPending,
    isSuccess,
    error,
  } = useMutation<ILike, ApiError, RemoveLikeDto>({
    mutationFn: likeApi.removeLike,
    onError: (error) => {
      if (!error) return
      console.log('like remove error', error)
    },
    onSuccess: (like) => {
      queryApi.invalidateQueries({
        queryKey: ['likesInfo', like.userId, like.postId],
      })
    },
  })

  const removeLike = async (removeDto: RemoveLikeDto) => {
    mutateRemoveLike(removeDto)
  }

  return {
    removeLike,
    isPending,
    isSuccess,
    error,
  }
}
