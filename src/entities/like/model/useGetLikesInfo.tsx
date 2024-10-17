import { useQuery } from '@tanstack/react-query'
import { LikesInfo } from '../types'
import { ApiError } from '@shared/types'
import { likeApi } from '../api/api'

export const useGetLikesInfo = (userId?: number, postId?: number) => {
  const {
    data: likesInfo,
    error,
    isPending,
    isSuccess,
  } = useQuery<LikesInfo, ApiError>({
    queryKey: ['likesInfo', userId, postId],
    queryFn: () => likeApi.getLikesInfo(userId || -1, postId || -1),
    enabled: (!!userId || userId === 0) && (!!postId || postId === 0),
  })

  return {
    likesInfo,
    error,
    isPending,
    isSuccess,
  }
}
