import { ReactNode } from 'react'

export type BottomTabsRouteNames = 'map' | 'newPost' | 'profile'

export type BottomTabBarRouteData = {
  name: BottomTabsRouteNames
  icon: ReactNode
  iconGray: ReactNode
  title: string
  color: string
}
