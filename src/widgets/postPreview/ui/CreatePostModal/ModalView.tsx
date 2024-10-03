import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import { tabBarHeight } from '@shared/constants'
import { toggleHeaderHeight } from '@widgets/postPreview/constants'

interface Props extends PropsWithChildren {
  isOpen: boolean
}

export const ModalView = ({ isOpen, children }: Props) => {
  const [modalHeight, setModalHeight] = useState(0)

  const slideAnim = useSharedValue(0)
  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(
        -modalHeight - tabBarHeight + toggleHeaderHeight,
      )
    } else {
      slideAnim.value = withTiming(-tabBarHeight - toggleHeaderHeight)
    }
  }, [isOpen])
  const onLayout = (e: LayoutChangeEvent) => {
    setModalHeight(e.nativeEvent.layout.height)
  }

  return (
    <Animated.View onLayout={onLayout} style={[styles.modal, slideStyles]}>
      {children}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  modal: {
    zIndex: 1,
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    minHeight: 400,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    overflow: 'hidden',
  },
})
