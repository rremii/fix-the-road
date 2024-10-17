import React, { useEffect } from 'react'
import { Platform, Pressable, StyleSheet } from 'react-native'
import { useUIStore } from '@shared/store/UIStore'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const Burger = () => {
  const setLeftSideBar = useUIStore((state) => state.setLeftSideBar)
  const isSideBar = useUIStore((state) => state.isLeftSideBar)

  const arrowAnim = useSharedValue(0)

  const rotateLine1Styles = useAnimatedStyle(() => {
    const rotateAnim = interpolate(arrowAnim.value, [0, 1], [0, -45])
    return {
      transform: [{ rotate: rotateAnim + 'deg' }],
    }
  })
  const rotateLine2Styles = useAnimatedStyle(() => {
    const rotateAnim = interpolate(arrowAnim.value, [0, 1], [0, 45])
    return {
      transform: [{ rotate: rotateAnim + 'deg' }],
    }
  })
  const opacityLineStyles = useAnimatedStyle(() => {
    const fadeAnim = interpolate(arrowAnim.value, [0, 1], [1, 0])
    return { opacity: fadeAnim }
  })

  useEffect(() => {
    if (isSideBar) {
      arrowAnim.value = withTiming(1)
    } else {
      arrowAnim.value = withTiming(0)
    }
  }, [isSideBar])

  const toggleSideBar = () => {
    if (isSideBar) {
      setLeftSideBar(false)
    } else {
      setLeftSideBar(true)
    }
  }
  return (
    <>
      <Pressable
        style={[styles.burger, webStyles?.burger]}
        onPress={toggleSideBar}
      >
        <Animated.View style={[styles.bar, rotateLine1Styles]} />
        <Animated.View style={[styles.bar, opacityLineStyles]} />
        <Animated.View style={[styles.bar, rotateLine2Styles]} />
      </Pressable>
    </>
  )
}
const webStyles =
  Platform.OS === 'web'
    ? StyleSheet.create({
        burger: {
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // only for web
        },
      })
    : null
const styles = StyleSheet.create({
  burger: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
    left: '105%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    gap: 5,
  },

  bar: {
    width: 25,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 3,
  },
})
