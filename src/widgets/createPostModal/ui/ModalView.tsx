import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import {
  modalSlideAnimDuration,
  panGestureBreak,
  tabBarHeight,
} from '@shared/constants'
import { openHeaderHeight } from '@widgets/createPostModal/constants'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

interface Props extends PropsWithChildren {
  isOpen: boolean
  closeModal: () => void
  openModal: () => void
}

export const ModalView = ({
  isOpen,
  children,
  closeModal,
  openModal,
}: Props) => {
  const [modalHeight, setModalHeight] = useState(0)

  const modalOpenY = -modalHeight - tabBarHeight
  const modalCloseY = -tabBarHeight - openHeaderHeight

  const slideAnim = useSharedValue(0)
  const slideStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideAnim.value }],
    }
  })

  const panGesture = Gesture.Pan().onChange((e) => {
    if (e.translationY < -panGestureBreak) return runOnJS(openModal)()
    if (e.translationY > panGestureBreak) return runOnJS(closeModal)()
  })

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(modalOpenY, {
        duration: modalSlideAnimDuration,
      })
    } else {
      slideAnim.value = withTiming(modalCloseY, {
        duration: modalSlideAnimDuration,
      })
    }
  }, [isOpen, modalHeight])

  const onLayout = (e: LayoutChangeEvent) => {
    setModalHeight(e.nativeEvent.layout.height)
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View onLayout={onLayout} style={[styles.modal, slideStyles]}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}
const styles = StyleSheet.create({
  modal: {
    zIndex: 1,
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    overflow: 'hidden',
  },
})
