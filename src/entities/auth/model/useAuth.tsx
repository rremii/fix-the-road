import { useContext, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useAuthStore } from './useAuthStore'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { storage } from '@modules/secureStorage'

export const useAuth = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState)
  const authState = useAuthStore((state) => state.authState)
  const { openToast } = useToast()

  const {
    error,
    data: refreshData,
    isSuccess,
  } = useQuery({
    queryKey: ['refresh'],
    retry: false,
    queryFn: authApi.refresh,
    enabled: authState !== 'success',
  })

  useEffect(() => {
    if (!refreshData || !isSuccess) return
    const { accessToken } = refreshData

    storage.setItem(ACCESS_TOKEN, accessToken)
    setAuthState('success')
  }, [refreshData, isSuccess])

  useEffect(() => {
    if (!error) return
    console.log(error)
    openToast({
      type: 'error',
      content: 'Session expired',
    })

    setAuthState('rejected')

    storage
      .removeItem(ACCESS_TOKEN)
      .catch(() => console.log('could not delete token'))
  }, [error])
}
