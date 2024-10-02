import { tabBarHeight } from '@shared/constants'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, LayoutChangeEvent, Image } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import WideArrow from '@icons/wide-arrow.svg'

interface Props {
  postPhotoUri: string
  isOpen: boolean
}

const toggleHeaderHeight = 30
export const CreatePostModal = ({ isOpen, postPhotoUri }: Props) => {
  const [modalHeight, setModalHeight] = useState(0)
  const slideAnim = useSharedValue(0)

  const slideStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: slideAnim.value - toggleHeaderHeight,
        },
      ],
    }
  })

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withTiming(-modalHeight - tabBarHeight)
    } else {
      slideAnim.value = withTiming(0)
    }
  }, [isOpen])

  const onLayout = (e: LayoutChangeEvent) => {
    setModalHeight(e.nativeEvent.layout.height)
  }

  return (
    <Animated.View onLayout={onLayout} style={[styles.modal, slideStyles]}>
      <View style={styles.toggleHeader}>
        <WideArrow width={200} height={15} />
      </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  modal: {
    zIndex: 10,
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIconCont: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
})
