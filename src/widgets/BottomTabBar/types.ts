import { ReactNode } from 'react'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'

export type BottomTabsRouteNames = 'map' | 'newPost' | 'profile'

export type BottomTabBarRouteData = {
  name: BottomTabsRouteNames
  icon: ReactNode
  iconGray: ReactNode
  title: string
  color: string
}
