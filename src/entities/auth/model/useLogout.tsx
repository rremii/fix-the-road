import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { DefaultApiResponse } from '@shared/api/types'
import { ApiError } from '@shared/types'
import { useAuthStore } from './useAuthStore'
import { storage } from '@modules/storage'
import { ACCESS_TOKEN } from '@shared/api/constants'

export const useLogout = () => {
  const { openToast } = useToast()
  const setAuthState = useAuthStore((state) => state.setAuthState)

  const {
    isPending,
    isError,
    error,
    isSuccess,
    mutate: mutateLogout,
  } = useMutation<DefaultApiResponse, ApiError, void>({
    mutationFn: authApi.logout,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      openToast({
        type: 'warn',
        content: 'You were logged out',
      })
    },
  })

  const handleLogout = async () => {
    await mutateLogout()
    await storage.removeItem(ACCESS_TOKEN)
  }

  return {
    logout: handleLogout,
    isPending,
    isError,
    error,
    isSuccess,
  }
}
