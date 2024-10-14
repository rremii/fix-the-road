import { useMutation } from '@tanstack/react-query'
import { likeApi } from '../api/api'
import { AddLikeDto, ILike } from '../types'
import { ApiError } from '@shared/types'
import { queryApi } from '@shared/api/queryApi'

export const useAddLike = (userId: number, postId: number) => {
  const {
    mutate: mutateAddLike,
    isPending,
    isSuccess,
    error,
  } = useMutation<ILike, ApiError, AddLikeDto>({
    mutationFn: likeApi.addLike,
    onError: (error) => {
      if (!error) return
    },
    onSuccess: () => {
      queryApi.invalidateQueries({ queryKey: ['likesinfo', userId, postId] })
    },
  })

  const addLike = async (addLikeDto: AddLikeDto) => {
    mutateAddLike(addLikeDto)
  }

  return {
    addLike,
    isPending,
    isSuccess,
    error,
  }
}
