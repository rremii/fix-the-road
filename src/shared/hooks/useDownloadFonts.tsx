import { useFonts } from 'expo-font'
import { useEffect } from 'react'

import * as SplashScreen from 'expo-splash-screen'

export const useDownloadFonts = () => {
  const [loaded, error] = useFonts({
    'Comic-Sans-MS': require('./../../../assets/fonts/Comic-Sans-MS.ttf'),
    'NF-okeanos-Regular': require('./../../../assets/fonts/NF-okeanos-Regular.ttf'),
    'SpaceMono-Regular': require('./../../../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
}
