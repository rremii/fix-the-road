import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { getRouteDataByName } from '../utils/getRouteDataByName'
import { BottomTabsRouteNames } from '../types'
import { TAB_BAR_HEIGHT } from '@shared/constants'
import { useUIStore } from 'src/entities/ui/model/UIStore'
import { Portal } from '@gorhom/portal'

export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const isBottomTabs = useUIStore((state) => state.bottomTabBar)

  const slideAnim = useSharedValue(0)

  useEffect(() => {
    if (isBottomTabs) {
      slideAnim.value = withTiming(0)
    } else {
      slideAnim.value = withTiming(TAB_BAR_HEIGHT)
    }
  }, [isBottomTabs])

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))

  const goTo = (path: string) => {
    navigation.navigate(path)
  }

  return (
    <>
      <Portal>
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
      </Portal>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    height: TAB_BAR_HEIGHT,
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
