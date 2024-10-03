import { Portal } from '@gorhom/portal'
import { useUIStore } from '@shared/store/UIStore'
import { Overlay } from '@shared/ui/Overlay'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { StyleSheet, LayoutChangeEvent } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props extends PropsWithChildren {}

export const SideBarLeft = ({ children }: Props) => {
  const isOpen = useUIStore((state) => state.isLeftSideBar)
  const setLeftSideBar = useUIStore((state) => state.setLeftSideBar)

  const [contWidth, setContWidth] = useState(0)
  const slideAnim = useSharedValue(0)

  const slideStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }))

  useEffect(() => {
    if (isOpen) slideAnim.value = withTiming(contWidth)
    else slideAnim.value = withTiming(0)
  }, [isOpen])

  const close = () => {
    setLeftSideBar(false)
  }
  const onLayout = (e: LayoutChangeEvent) => {
    const contWidth = e.nativeEvent.layout.width
    setContWidth(contWidth)
  }
  return (
    <Portal>
      <Overlay isActive={isOpen} onPress={close} />
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
    zIndex: 1,
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: '100%',
    bottom: 0,
    minWidth: 300,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
})
