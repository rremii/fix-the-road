import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AuthResponse, RegisterDto } from '../types'
import { authApi } from '../api/api'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { storage } from '@modules/storage'
import { useToast } from '@shared/modules/toast'
import { useAuthStore } from './useAuthStore'

export const useRegister = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState)
  const { openToast } = useToast()

  const {
    data,
    error,
    isPending,
    mutate: mutateRegister,
    isError,
    isSuccess,
  } = useMutation<AuthResponse, AxiosError, RegisterDto>({
    mutationFn: authApi.register,
    onError: (error) => {
      if (!error) return

      openToast({
        type: 'error',
        content: error.message,
      })

      storage
        .removeItem(ACCESS_TOKEN)
        .catch(() => console.log('could not delete clientToken'))
      setAuthState('rejected')
    },
    onSuccess: (data) => {
      if (!data || !data.accessToken) return
      const { accessToken } = data

      openToast({
        type: 'warn',
        content: 'Successfully registered',
      })

      setAuthState('success')

      storage.setItem(ACCESS_TOKEN, accessToken)
    },
  })

  const register = (registerDto: RegisterDto) => {
    mutateRegister(registerDto)
  }

  return { register, isPending, isSuccess, error, isError }
}
