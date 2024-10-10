import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native'
import { Image } from 'expo-image'

interface Props {
  avatar?: string
  size?: number
}
export const Avatar = ({ avatar = '', size = 50 }: Props) => {
  const { width: windowWidth } = useWindowDimensions()

  const styles = getStyles(size, windowWidth)
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={avatar} />
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
