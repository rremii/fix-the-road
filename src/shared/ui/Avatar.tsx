import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Image } from 'expo-image'
import DefaultAvatar from '@icons/profile.svg'

interface Props {
  avatar?: string
  size?: number
}

export const Avatar = ({ avatar = '', size = 50 }: Props) => {
  const { width: windowWidth } = useWindowDimensions()

  const styles = getStyles(size, windowWidth)
  return (
    <View style={styles.container}>
      {avatar ? (
        <Image style={styles.image} source={{ uri: avatar }} />
      ) : (
        <DefaultAvatar style={styles.image} />
      )}
    </View>
  )
}
const getStyles = (size: number, windowWidth: number) =>
  StyleSheet.create({
    container: {
      borderRadius: size / 2,
      overflow: 'hidden',
    },
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
      maxWidth: windowWidth * 0.8,
      maxHeight: windowWidth * 0.8,
    },
  })
