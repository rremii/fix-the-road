import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

interface Params {
  onEnter?: () => void
  onLeave?: () => void
}

export const useOnPageSwitch = ({ onEnter, onLeave }: Params) => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      if (onLeave) onLeave()
    })
    const unsubscribeFocus = navigation.addListener('focus', () => {
      if (onEnter) onEnter()
    })

    return () => {
      if (onLeave) onLeave()
      unsubscribeBlur()
      unsubscribeFocus()
    }
  }, [navigation])
}
