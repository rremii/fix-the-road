import { Portal } from '@gorhom/portal'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Dimensions, LayoutChangeEvent, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props extends PropsWithChildren {
  isOpen: boolean
}

export const SideBarLeft = ({ children, isOpen }: Props) => {
  const [contWidth, setContWidth] = useState(0)
  const slideAnim = useSharedValue(0)

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }))

  useEffect(() => {
    if (isOpen) slideAnim.value = withTiming(contWidth)
    else slideAnim.value = withTiming(0)
  }, [isOpen])

  const onLayout = (e: LayoutChangeEvent) => {
    const contWidth = e.nativeEvent.layout.width
    setContWidth(contWidth)
  }
  return (
    <Portal>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.container,
          slideStyles,
          {
            zIndex: isOpen ? 500 : 1,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Portal>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: '100%',
    bottom: 0,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,

    minWidth:
      Dimensions.get('window').width > 700
        ? 300
        : Dimensions.get('window').width - 70,
    maxWidth: Dimensions.get('window').width - 50,
  },
})
