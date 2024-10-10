import { useEffect, useState } from 'react'
import { Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SideBarRight } from '../../../shared/ui/SideBarRight'
import Arrow from '@icons/arrow.svg'
import { useUIStore } from '@shared/store/UIStore'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const ToggleRightSideBar = () => {
  const setRightSideBar = useUIStore((state) => state.setRightSideBar)
  const isSideBar = useUIStore((state) => state.isRightSideBar)

  const rotateAnim = useSharedValue(0)
  const rotateStyles = useAnimatedStyle(() => ({
    transform: [{ rotateY: rotateAnim.value + 'deg' }],
  }))

  useEffect(() => {
    if (isSideBar) {
      rotateAnim.value = withTiming(-180)
    } else {
      rotateAnim.value = withTiming(0)
    }
  }, [isSideBar])

  const toggleSideBar = () => {
    if (isSideBar) {
      setRightSideBar(false)
    } else {
      setRightSideBar(true)
    }
  }
  return (
    <>
      <Pressable
        style={[styles.btn, webStyles?.btn, rotateStyles]}
        onPress={toggleSideBar}
      >
        <Animated.View style={rotateStyles}>
          <Arrow width={25} height={25} />
        </Animated.View>
      </Pressable>
    </>
  )
}
const webStyles =
  Platform.OS === 'web'
    ? StyleSheet.create({
        btn: {
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // only for web
        },
      })
    : null
const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
    right: '105%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 13,
    gap: 5,
    transform: [{ rotate: '180deg' }],
  },

  bar: {
    width: 25,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 3,
  },
})
