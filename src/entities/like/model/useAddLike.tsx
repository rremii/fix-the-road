import { useMutation } from '@tanstack/react-query'
import { likeApi } from '../api/api'
import { AddLikeDto, ILike } from '../types'
import { ApiError } from '@shared/types'
import { queryApi } from '@shared/api/queryApi'

export const useAddLike = () => {
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
    onSuccess: (like) => {
      //void operator lol,remove
      void queryApi.invalidateQueries({
        queryKey: ['likesInfo', like.userId, like.postId],
      })
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
