import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native'

interface Props {
  avatar?: string
  size?: number
}

export const Avatar = ({ avatar = '', size = 50 }: Props) => {
  const { width: windowWidth } = useWindowDimensions()

  const maxWidth = windowWidth * 0.8
  const avatarSize = size > maxWidth ? maxWidth : size

  const styles = getStyles(avatarSize)
  return (
    <View style={styles.container}>
      <Image width={avatarSize} height={avatarSize} source={{ uri: avatar }} />
    </View>
  )
}
const getStyles = (size: number) =>
  StyleSheet.create({
    container: {
      borderRadius: size / 2,
      overflow: 'hidden',
    },
  })
