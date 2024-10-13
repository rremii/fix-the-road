import { useMutation } from '@tanstack/react-query'
import { ReactNode, useContext, useEffect } from 'react'
import { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useAuthStore } from './useAuthStore'
import { AuthResponse, LoginDto } from '../types'
import { authApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { storage } from '@modules/storage'
import { ApiError } from '@shared/types'

export const useLogin = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState)

  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateLogin,
    isError,
    isSuccess,
  } = useMutation<AuthResponse, ApiError, LoginDto>({
    mutationFn: authApi.login,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })

      storage
        .removeItem(ACCESS_TOKEN)
        .catch(() => console.log('could not delete token'))

      setAuthState('rejected')
    },
    onSuccess: (data) => {
      if (!data || !data.accessToken) return
      const { accessToken } = data

      openToast({
        type: 'warn',
        content: 'Successfully logged in',
      })

      setAuthState('success')
      storage.setItem(ACCESS_TOKEN, accessToken)
    },
  })

  const login = (loginDto: LoginDto) => {
    mutateLogin(loginDto)
  }

  return { login, isPending, isSuccess, error, isError }
}
