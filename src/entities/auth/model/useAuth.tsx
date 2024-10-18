import { useEffect } from 'react'
import { useAuthStore } from './useAuthStore'
import { ACCESS_TOKEN } from '@shared/api/constants'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/api'
import { useToast } from '@shared/modules/toast'
import { storage } from '@modules/storage'
import * as SplashScreen from 'expo-splash-screen'

export const useAuth = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState)
  const authState = useAuthStore((state) => state.authState)

  const {
    error,
    data: refreshData,
    isSuccess,
    isFetched,
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

    setAuthState('rejected')

    storage
      .removeItem(ACCESS_TOKEN)
      .catch(() => console.log('could not delete token'))
  }, [error])
}
