import { useNavigation } from '@react-navigation/native'
import { useUIStore } from '@shared/store/UIStore'
import { useEffect } from 'react'

export const useHideTabBar = () => {
  const hideTabBar = useUIStore((state) => state.hideTabBar)
  const showTabBar = useUIStore((state) => state.showTabBar)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      showTabBar()
    })
    const unsubscribeFocus = navigation.addListener('focus', () => {
      hideTabBar()
    })

    return () => {
      showTabBar()
      unsubscribeBlur()
      unsubscribeFocus()
    }
  }, [navigation])
}
