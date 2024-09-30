import React, { FC, ReactNode } from 'react'
import { View, Text } from 'react-native'
import { HomeNavigationParam, RootNavigationParam } from './types'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import NewPostNavigation from './NewPost'
import { MapPage } from '@pages/mobile/home/Map.page'
import { ProfilePage } from '@pages/mobile/home/Profile.page'

import Camera from '@icons/camera.svg'
import CameraGray from '@icons/camera-gray.svg'
import Map from '@icons/map.svg'
import MapGray from '@icons/map-gray.svg'
import Profile from '@icons/profile.svg'
import ProfileGray from '@icons/profile-gray.svg'

const iconSize = 25
const HomeTabs = createBottomTabNavigator<HomeNavigationParam>()

const HomeNavigation = () => {
  const routes: {
    name: keyof HomeNavigationParam
    component: React.FC
    icon: ReactNode
    iconGray: ReactNode
  }[] = [
    {
      name: 'map',
      component: MapPage,
      icon: <Map width={iconSize} height={iconSize} />,
      iconGray: <MapGray width={iconSize} height={iconSize} />,
    },
    {
      name: 'newPost',
      component: NewPostNavigation,
      icon: <Camera width={iconSize} height={iconSize} />,
      iconGray: <CameraGray width={iconSize} height={iconSize} />,
    },
    {
      name: 'profile',
      component: ProfilePage,
      icon: <Profile width={iconSize} height={iconSize} />,
      iconGray: <ProfileGray width={iconSize} height={iconSize} />,
    },
  ]

  return (
    <HomeTabs.Navigator screenOptions={TabsOptions} initialRouteName={'map'}>
      {routes.map((route, index) => (
        <HomeTabs.Screen
          key={index}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? route.icon : route.iconGray,
          }}
          name={route.name}
          component={route.component}
        />
      ))}
    </HomeTabs.Navigator>
  )
}
export default HomeNavigation
const TabsOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarItemStyle: {
    paddingTop: 5,
    justifyContent: 'center',
  },
  tabBarIconStyle: {
    width: iconSize,
    height: iconSize,
    flex: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
}
