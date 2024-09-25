import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export const useDownloadFonts = () => {
  const [loaded, error] = useFonts({
    Okeanos: require('./../assets/fonts/NF-okeanos-Regular.ttf'),
    ComicSans: require('./../assets/fonts/Comic-Sans-MS.ttf'),
    SpaceMono: require('./../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])
}
