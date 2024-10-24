import { Portal } from '@gorhom/portal'
import {
  MODAL_SLIDE_ANIM_DURATION,
  PAN_GESTURE_BREAK,
  TAB_BAR_HEIGHT,
} from '@shared/constants'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props extends PropsWithChildren {
  isOpen: boolean
  closeModal: () => void
}

export const BottomModal = ({ children, isOpen, closeModal }: Props) => {
  const [modalHeight, setModalHeight] = useState(0)
  const slideAnim = useSharedValue(0)

  const panGesture = Gesture.Pan().onChange((e) => {
    if (e.translationY > PAN_GESTURE_BREAK) return runOnJS(closeModal)()
  })

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(-modalHeight, {
        duration: MODAL_SLIDE_ANIM_DURATION,
      })
    } else {
      slideAnim.value = withTiming(0, { duration: MODAL_SLIDE_ANIM_DURATION })
    }
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
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={onLayout}
          style={[styles.container, slideStyles]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </Portal>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: TAB_BAR_HEIGHT,
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
