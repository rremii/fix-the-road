import { useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export const useUnlockScreenOrientation = () => {
  useEffect(() => {
    ScreenOrientation.unlockAsync().catch((err) => console.log(err))
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      ).catch((err) => console.log(err))
    }
  }, [])
}
