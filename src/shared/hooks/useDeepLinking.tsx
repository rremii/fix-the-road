import * as Linking from 'expo-linking'
import { useEffect } from 'react'

export const useDeepLinking = () => {
  useEffect(() => {
    Linking.openURL('fix-the-road://').catch((err) =>
      console.error('Could not open deep link', err),
    )
  }, [])
}
