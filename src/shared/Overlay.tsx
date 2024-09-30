import React, { useEffect } from 'react'
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  isActive: boolean
  backgroundColor?: string
  startDuration?: number
  endDuration?: number
  zIndex?: number
  onPress: () => void
}

export const Overlay = ({
  isActive,
  onPress,
  backgroundColor = '#00000045',
  startDuration = 300,
  endDuration = 300,
  zIndex = 1,
}: Props) => {
  const fadeAnim = useSharedValue(0)

  useEffect(() => {
    if (isActive) {
      fadeAnim.value = withTiming(1, { duration: startDuration })
    } else {
      fadeAnim.value = withTiming(0, { duration: endDuration })
    }
  }, [isActive])

  const fadeStyles = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }))

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          fadeStyles,
          {
            zIndex,
            backgroundColor,
            pointerEvents: 'none',
          },
        ]}
      ></Animated.View>
      <Pressable
        onPress={onPress}
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex,
            pointerEvents: isActive ? 'auto' : 'none',
          },
        ]}
      />
    </>
  )
}
