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
import { DefaultApiResponse } from '@shared/api/types'
import { ApiError } from '@shared/types'

export const useVerifyCode = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateVerifyCode,
    isError,
    isSuccess,
  } = useMutation<DefaultApiResponse, ApiError, string>({
    mutationFn: authApi.verifyCode,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: 'Code is invalid',
      })
    },
  })

  const verifyCode = (code: string) => {
    mutateVerifyCode(code)
  }

  return { verifyCode, isPending, isSuccess, error, isError }
}
