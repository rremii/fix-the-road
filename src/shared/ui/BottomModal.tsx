import { Portal } from '@gorhom/portal'
import { modalSlideAnimDuration, tabBarHeight } from '@shared/constants'
import React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props extends PropsWithChildren {
  isOpen: boolean
}

export const BottomModal = ({ children, isOpen }: Props) => {
  const [modalHeight, setModalHeight] = useState(0)
  const slideAnim = useSharedValue(0)

  useEffect(() => {
    if (isOpen)
      slideAnim.value = withTiming(-modalHeight, {
        duration: modalSlideAnimDuration,
      })
    else slideAnim.value = withTiming(0, { duration: modalSlideAnimDuration })
  }, [isOpen, modalHeight])

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))

  const onLayout = (e: LayoutChangeEvent) => {
    const modalHeight = e.nativeEvent.layout.height
    setModalHeight(modalHeight)
  }

  return (
    <Portal>
      <Animated.View
        onLayout={onLayout}
        style={[styles.container, slideStyles]}
      >
        {children}
      </Animated.View>
    </Portal>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: tabBarHeight,
    zIndex: 2,
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: '100%',
    left: 0,
    minHeight: 400,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
})
