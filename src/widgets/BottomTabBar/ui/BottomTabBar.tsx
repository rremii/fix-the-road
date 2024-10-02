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

const iconSize = 25
const tabBarHeight = 50
export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const isBottomTabsHidden = true

  //   const slideAnim = useSharedValue(0)

  //   useEffect(() => {
  //     if (isBottomTabsHidden) {
  //       slideAnim.value = withTiming(tabBarHeight)
  //     } else {
  //       slideAnim.value = withTiming(0)
  //     }
  //   }, [isBottomTabsHidden])

  //   const slideStyles = useAnimatedStyle(() => ({
  //     transform: [{ translateY: slideAnim.value }],
  //   }))

  const goTo = (path: string) => {
    navigation.navigate(path)
  }

  console.log(state.routes)
  return (
    <Animated.View style={[styles.container]}>
      {state.routes.map((route) => {
        return (
          <Pressable
            key={route.key}
            style={styles.tabBarItemStyle}
            onPress={() => goTo(route.name)}
          >
            <Text style={styles.tabBarLabelStyle}>{route.name}</Text>
          </Pressable>
        )
      })}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    flexDirection: 'row',
    transform: [{ translateY: -12 }],
  },
  tabBarItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
    backgroundColor: 'red',
  },
  tabBarIconStyle: {
    width: iconSize,
    height: iconSize,
    flex: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
})
