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
import { BottomTabBar } from '@widgets/bottomTabBar/ui/BottomTabBar'
import { BottomTabsRouteNames } from '@widgets/bottomTabBar/types'

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
      // screenListeners={({ navigation }) => ({
      //   state: () => {
      //     const state = navigation.getState()

      //     const currentRoute = state.routes[state.index]

      //     console.log('state changed', currentRoute)
      //   },
      // })}
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
