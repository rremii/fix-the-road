import { useMutation } from '@tanstack/react-query'
import { ReactNode, useContext, useEffect } from 'react'
import { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useAuthStore } from './useAuthStore'
import { AuthResponse, LoginDto } from '../types'
import { authApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { storage } from '@modules/secureStorage'
import { DefaultApiResponse } from '@shared/api/types'

export const useSendCode = () => {
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateSendCode,
    isError,
    isSuccess,
  } = useMutation<DefaultApiResponse, AxiosError, string>({
    mutationFn: authApi.sendCode,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })
    },
  })

  const sendCode = (email: string) => {
    mutateSendCode(email)
  }

  return { sendCode, isPending, isSuccess, error, isError }
}
