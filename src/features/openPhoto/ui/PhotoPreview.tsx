import { Portal } from '@gorhom/portal'
import { Overlay } from '@shared/ui/Overlay'
import React, { useEffect } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Image } from 'expo-image'

interface Props {
  photoUri: string
  isOpen: boolean
  close: () => void
}

export const PhotoPreview = ({ photoUri, isOpen, close }: Props) => {
  const fadeAnim = useSharedValue(0)
  const fadeStyles = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    pointerEvents: isOpen ? 'auto' : 'none',
  }))

  useEffect(() => {
    if (isOpen) {
      fadeAnim.value = withTiming(1)
    } else {
      fadeAnim.value = withTiming(0)
    }
  }, [isOpen])

  return (
    <Portal>
      <Animated.View style={[styles.container, fadeStyles]}>
        <Pressable style={styles.pressableCont} onPress={close}>
          <Image contentFit="contain" source={photoUri} style={styles.photo} />
        </Pressable>
      </Animated.View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000dd',
    zIndex: 15,
  },
  pressableCont: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '90%',
    height: '60%',
  },
})
