import React from 'react'
import { HomeNavigationParam } from './types'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import NewPostNavigation from './NewPost'
import { MapPage } from '@pages/mobile/home/map/Map.page'
import { ProfilePage } from '@pages/mobile/home/Profile.page'
import { BottomTabsRouteNames } from '@widgets/bottomTabBar/types'
import { BottomTabBar } from '@widgets/bottomTabBar/ui/BottomTabBar'

const HomeTabs = createBottomTabNavigator<HomeNavigationParam>()

const HomeNavigation = () => {
  const routes: {
    name: BottomTabsRouteNames
    component: React.FC
  }[] = [
    {
      name: 'map',
      component: MapPage,
    },
    {
      name: 'newPost',
      component: NewPostNavigation,
    },
    {
      name: 'profile',
      component: ProfilePage,
    },
  ]

  return (
    <HomeTabs.Navigator
      screenOptions={tabsOptions}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName={'map'}
    >
      {routes.map((route, index) => (
        <HomeTabs.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </HomeTabs.Navigator>
  )
}
export default HomeNavigation
const tabsOptions: BottomTabNavigationOptions = {
  headerShown: false,
}
