import { useMemo } from 'react'
import { IPost } from '../types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { postApi } from '../api/api'
import { ApiError } from '@shared/types'

export const useGetPosts = () => {
  const {
    data: posts,
    isSuccess,
    error,
    isPending,
  } = useQuery<IPost[], ApiError>({
    queryKey: ['posts'],
    queryFn: postApi.getAll,
  })

  return {
    posts: posts || [],
    isSuccess,
    error,
    isPending,
  }
}
