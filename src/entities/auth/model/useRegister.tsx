import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AuthResponse, RegisterDto } from '../types'
import { authApi } from '../api/api'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { storage } from '@modules/storage'
import { useToast } from '@shared/modules/toast'
import { useAuthStore } from './useAuthStore'
import { register } from '../api/register.saga'
import { URIToFile } from '@shared/utils/URIToFile'
import { Platform } from 'react-native'

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
    mutationFn: register,
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

  const handleRegister = (registerDto: RegisterDto) => {
    // let dto: RegisterDto

    // if (registerDto.avatar && Platform.OS === 'web') {
    //   dto = {
    //     ...registerDto,
    //     avatar: URIToFile(registerDto.avatar.uri, registerDto.avatar.name),
    //   }
    // } else {
    //   dto = registerDto
    // }

    mutateRegister(registerDto)
  }

  return { register: handleRegister, isPending, isSuccess, error, isError }
}
