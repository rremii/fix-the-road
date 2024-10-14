import { useMemo } from 'react'
import { IPost } from '../types'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { postApi } from '../api/api'
import { ApiError } from '@shared/types'

export const useGetPost = (postId?: IPost['id']) => {
  const {
    data: post,
    isSuccess,
    error,
    isPending,
  } = useQuery<IPost, ApiError, number>({
    queryKey: ['post', postId],
    queryFn: () => postApi.getById(postId || -1),
    enabled: !!postId,
  })

  return {
    post,
    isSuccess,
    error,
    isPending,
  }
}
