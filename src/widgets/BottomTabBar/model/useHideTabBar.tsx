import { useNavigation } from '@react-navigation/native'
import { useUIStore } from '@shared/store/UIStore'
import { useEffect } from 'react'

export const useHideTabBar = (routeNames: string[]) => {
  const hideTabBar = useUIStore((state) => state.hideTabBar)
  const showTabBar = useUIStore((state) => state.showTabBar)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.getState()

      const currentRoute = state?.routes[state.index]
      if (!currentRoute) return

      if (routeNames.includes(currentRoute.name)) {
        hideTabBar()
      } else {
        showTabBar()
      }
    })

    return unsubscribe
  }, [navigation])
}
