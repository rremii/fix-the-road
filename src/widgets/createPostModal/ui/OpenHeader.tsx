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
import {
  slideDelay,
  openHeaderHeight,
} from '@widgets/createPostModal/constants'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export const OpenHeader = ({ isOpen, onClick }: Props) => {
  const slideAnimOpenHeader = useSharedValue(-openHeaderHeight)

  const slideStylesOpenHeader = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnimOpenHeader.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnimOpenHeader.value = withDelay(
        slideDelay,
        withTiming(-openHeaderHeight),
      )
    } else {
      slideAnimOpenHeader.value = withDelay(slideDelay, withTiming(0))
    }
  }, [isOpen])

  return (
    <Pressable onPress={onClick}>
      <Animated.View style={[styles.openHeader, slideStylesOpenHeader]}>
        <WideArrow color={'#1ccb82'} width={200} height={15} />
      </Animated.View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  openHeader: {
    height: openHeaderHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
