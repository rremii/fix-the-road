import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { tabBarHeight } from '@shared/constants'
import WideArrow from '@icons/wide-arrow.svg'
import { slideDelay, toggleHeaderHeight } from '@widgets/postPreview/constants'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export const ToggleHeader = ({ isOpen, onClick }: Props) => {
  const slideAnimToggleHeader = useSharedValue(-toggleHeaderHeight)

  const slideStylesToggleHeader = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnimToggleHeader.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnimToggleHeader.value = withDelay(
        slideDelay,
        withTiming(-toggleHeaderHeight),
      )
    } else {
      slideAnimToggleHeader.value = withDelay(slideDelay, withTiming(0))
    }
  }, [isOpen])

  return (
    <Pressable onPress={onClick}>
      <Animated.View style={[styles.toggleHeader, slideStylesToggleHeader]}>
        <WideArrow color={'#1ccb82'} width={200} height={15} />
      </Animated.View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  toggleHeader: {
    height: toggleHeaderHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
