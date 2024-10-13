import { useEffect, useMemo } from 'react'
import { IUser } from '../types'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '../api/api'
import { ApiError } from '@shared/types'
import { useToast } from '@shared/modules/toast'

export const useGetMe = () => {
  const { openToast } = useToast()

  const {
    data: me,
    isSuccess,
    error,
    isPending,
  } = useQuery<IUser, ApiError>({
    queryKey: ['me'],
    queryFn: userApi.getMe,
  })

  useEffect(() => {
    if (!error) return

    openToast({
      content: error.message,
      type: 'error',
    })
  }, [error])

  return {
    me,
    isSuccess,
    error,
    isPending,
  }
}
