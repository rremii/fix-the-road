import { useQuery } from '@tanstack/react-query'
import { IUser } from '../types'
import { ApiError } from '@shared/types'
import { userApi } from '../api/api'
import { useEffect } from 'react'
import { useToast } from '@shared/modules/toast'

//todo make responsive
//todo make deep linking
export const useGetUser = (id?: number) => {
  const { openToast } = useToast()

  const {
    data: user,
    isSuccess,
    error,
    isPending,
  } = useQuery<IUser, ApiError>({
    queryKey: ['user', id],
    queryFn: () => userApi.getUserById(id || -1),
    enabled: !!id || id === 0,
  })

  useEffect(() => {
    if (!error) return

    openToast({
      content: error.message,
      type: 'error',
    })
  }, [error])

  return {
    user,
    isSuccess,
    error,
    isPending,
  }
}
