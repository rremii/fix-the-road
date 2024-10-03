import { tabBarHeight } from '@shared/constants'
import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  Image,
  Pressable,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import WideArrow from '@icons/wide-arrow.svg'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

interface Props {
  postPhotoUri: string
  isOpen: boolean
  openModal: () => void
}
const slideTime = 400
const toggleHeaderHeight = 30
export const CreatePostModal = ({ isOpen, postPhotoUri, openModal }: Props) => {
  const [modalHeight, setModalHeight] = useState(0)

  const slideAnim = useSharedValue(0)
  const slideAnimToggleHeader = useSharedValue(-toggleHeaderHeight)

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }))
  const slideStylesToggleHeader = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnimToggleHeader.value }],
  }))

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(
        -modalHeight - tabBarHeight + toggleHeaderHeight,
        { duration: slideTime },
      )
      slideAnimToggleHeader.value = withDelay(
        slideTime,
        withTiming(-toggleHeaderHeight),
      )
    } else {
      slideAnim.value = withTiming(-tabBarHeight - toggleHeaderHeight, {
        duration: slideTime,
      })
      slideAnimToggleHeader.value = withDelay(slideTime, withTiming(0))
    }
  }, [isOpen])

  const onLayout = (e: LayoutChangeEvent) => {
    setModalHeight(e.nativeEvent.layout.height)
  }

  return (
    <Animated.View onLayout={onLayout} style={[styles.modal, slideStyles]}>
      <Pressable onPress={openModal}>
        <Animated.View style={[styles.toggleHeader, slideStylesToggleHeader]}>
          <WideArrow color={'#1ccb82'} width={200} height={15} />
        </Animated.View>
      </Pressable>
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
  toggleHeader: {
    height: toggleHeaderHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIconCont: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
})
