import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import WideArrow from '@icons/wide-arrow.svg'
import {
  OPEN_HEADER_HEIGHT,
  SLIDE_DELAY,
} from '@widgets/createPostModal/constants'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export const OpenHeader = ({ isOpen, onClick }: Props) => {
  const slideAnimOpenHeader = useSharedValue(-OPEN_HEADER_HEIGHT)

  const slideStylesOpenHeader = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnimOpenHeader.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnimOpenHeader.value = withDelay(
        SLIDE_DELAY,
        withTiming(-OPEN_HEADER_HEIGHT),
      )
    } else {
      slideAnimOpenHeader.value = withDelay(SLIDE_DELAY, withTiming(0))
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
    height: OPEN_HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
