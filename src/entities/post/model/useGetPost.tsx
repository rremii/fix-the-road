import { IPost } from '../types'
import { useQuery } from '@tanstack/react-query'
import { postApi } from '../api/api'
import { ApiError } from '@shared/types'

export const useGetPost = (postId?: IPost['id']) => {
  const {
    data: post,
    isSuccess,
    error,
    isPending,
  } = useQuery<IPost, ApiError>({
    queryKey: ['posts', postId],
    queryFn: () => postApi.getById(postId || -1),
    enabled: !!postId || postId === 0,
  })

  return {
    post,
    isSuccess,
    error,
    isPending,
  }
}
