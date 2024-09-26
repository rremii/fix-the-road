import { useMediaQuery } from '@shared/hooks/useMediaQuery'
import { Stack, Tabs, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function App() {
  const router = useRouter()

  const { isDesktop, isMobile, isTablet } = useMediaQuery()

  useEffect(() => {
    router.push('/map')
  }, [])

  if (isDesktop)
    return (
      <Stack initialRouteName="map" screenOptions={{ headerShown: false }} />
    )
  else
    return (
      <Tabs initialRouteName="map" screenOptions={{ headerShown: false }} />
    )
}
