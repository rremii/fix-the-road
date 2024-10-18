import { bottomBarBarRoutes } from '../constants/bottomRoutesData'
import { BottomTabBarRouteData, BottomTabsRouteNames } from '../types'

export const getRouteDataByName = (name: BottomTabsRouteNames) => {
  return bottomBarBarRoutes.find(
    (route) => route.name === name,
  ) as BottomTabBarRouteData
}
