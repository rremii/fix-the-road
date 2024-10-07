import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import { modalSlideAnimDuration, tabBarHeight } from '@shared/constants'
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

  const panAnim = useSharedValue(0)
  const [savedPanAnim, savePanAnim] = useState(0)
  const slideAnim = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      panAnim.value = e.translationY

      if (e.translationY < -50) return runOnJS(openModal)()
      if (e.translationY > 50) return runOnJS(closeModal)()
      panAnim.value = e.translationY + savedPanAnim
    })
    .onEnd(() => {
      runOnJS(savePanAnim)(panAnim.value)
    })

  const panStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: panAnim.value + slideAnim.value }],
  }))
  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(-modalHeight - tabBarHeight, {
        duration: modalSlideAnimDuration,
      })
    } else {
      slideAnim.value = withTiming(-tabBarHeight - openHeaderHeight, {
        duration: modalSlideAnimDuration,
      })
    }
  }, [isOpen, modalHeight])

  const onLayout = (e: LayoutChangeEvent) => {
    setModalHeight(e.nativeEvent.layout.height)
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View onLayout={onLayout} style={[styles.modal, panStyles]}>
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
