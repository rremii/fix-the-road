import { Stack, Tabs, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function App() {
  const router = useRouter()

  useEffect(() => {
    router.push('/map')
  }, [])

  return (
    <Tabs initialRouteName="map" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="map" />
    </Tabs>
  )
}
