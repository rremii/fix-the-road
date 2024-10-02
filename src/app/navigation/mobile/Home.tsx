import React, { FC, ReactNode, useEffect, useState } from 'react'
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
import {
  createNavigationContainerRef,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native'
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { BottomTabBar } from '@widgets/BottomTabBar/ui/BottomTabBar'

const HomeTabs = createBottomTabNavigator<HomeNavigationParam>()
const iconSize = 25

const HomeNavigation = () => {
  const routes: {
    name: keyof HomeNavigationParam
    component: React.FC
    icon: ReactNode
    iconGray: ReactNode
    title: string
  }[] = [
    {
      title: 'Map',
      name: 'map',
      component: MapPage,
      icon: <Map width={iconSize} height={iconSize} />,
      iconGray: <MapGray width={iconSize} height={iconSize} />,
    },
    {
      title: 'New Post',
      name: 'newPost',
      component: NewPostNavigation,
      icon: <Camera width={iconSize} height={iconSize} />,
      iconGray: <CameraGray width={iconSize} height={iconSize} />,
    },
    {
      name: 'profile',
      title: 'Profile',
      component: ProfilePage,
      icon: <Profile width={iconSize} height={iconSize} />,
      iconGray: <ProfileGray width={iconSize} height={iconSize} />,
    },
  ]

  return (
    // <HomeTabs.Navigator screenOptions={tabsOptions} initialRouteName={'map'}>
    //   {routes.map((route, index) => (
    //     <HomeTabs.Screen
    //       key={index}
    //       options={{
    //         title: route.title,
    //         tabBarIcon: ({ focused }) =>
    //           focused ? route.icon : route.iconGray,
    //       }}
    //       name={route.name}
    //       component={route.component}
    //     />
    //   ))}
    // </HomeTabs.Navigator>
    <HomeTabs.Navigator
      screenOptions={tabsOptions}
      tabBar={BottomTabBar}
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
