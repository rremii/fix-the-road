import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SLIDE_DELAY } from '@widgets/createPostModal/constants'
import Cross from '@icons/cross.svg'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export const CloseHeader = ({ isOpen, onClick }: Props) => {
  const opacityAnim = useSharedValue(0)

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
  }))

  useEffect(() => {
    if (isOpen) {
      opacityAnim.value = withDelay(SLIDE_DELAY, withTiming(1))
    } else {
      opacityAnim.value = withDelay(SLIDE_DELAY, withTiming(0))
    }
  }, [isOpen])

  return (
    <View style={styles.closeHeader}>
      <Animated.View style={opacityStyles}>
        <TouchableOpacity onPress={onClick}>
          <Cross width={20} height={20} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  closeHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
})
