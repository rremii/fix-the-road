import {
  BottomTabBarProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ScreenProps } from 'react-native-screens'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { iconSize } from '../constants/sizes'
import { Image } from 'react-native'
import { getRouteDataByName } from '../utils/getRouteDataByName'
import { BottomTabsRouteNames } from '../types'
import { tabBarHeight } from '@shared/constants'
import { useUIStore } from '@shared/store/UIStore'

export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const isBottomTabsHidden = useUIStore((state) => state.isBottomTabBarHidden)

  const slideAnim = useSharedValue(0)

  useEffect(() => {
    if (isBottomTabsHidden) {
      slideAnim.value = withTiming(tabBarHeight)
    } else {
      slideAnim.value = withTiming(0)
    }
  }, [isBottomTabsHidden])

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))

  const goTo = (path: string) => {
    navigation.navigate(path)
  }

  return (
    <>
      <Animated.View style={[styles.container, slideStyles]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index

          const routeData = getRouteDataByName(
            route.name as BottomTabsRouteNames,
          )

          const { icon, iconGray, title, color } = routeData
          return (
            <Pressable
              key={route.key}
              style={styles.tabBarItemStyle}
              onPress={() => goTo(route.name)}
            >
              {isFocused ? icon : iconGray}
              <Text
                style={[
                  styles.tabBarLabelStyle,
                  { color: isFocused ? color : '#656565' },
                ]}
              >
                {title}
              </Text>
            </Pressable>
          )
        })}
      </Animated.View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  tabBarItemStyle: {
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
    backgroundColor: 'white',
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
})
