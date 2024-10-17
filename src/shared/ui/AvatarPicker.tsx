import React, { useState } from 'react'
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'

import { fallbackAvatar } from '@shared/constants'

interface Props {
  initialAvatar?: string
  onChange: (avatar: ImagePicker.ImagePickerAsset) => void
  size?: number
}

export const AvatarPicker = ({ size = 50, onChange, initialAvatar }: Props) => {
  const [avatar, setAvatar] = useState(initialAvatar)
  const { width: windowWidth } = useWindowDimensions()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    })

    if (result.assets && result.assets[0]) {
      setAvatar(result.assets[0].uri)
      onChange(result.assets[0])
    }
  }

  const styles = getStyles(size, windowWidth)
  return (
    <Pressable onPress={pickImageAsync} style={styles.container}>
      <Image style={styles.image} source={{ uri: avatar || fallbackAvatar }} />
    </Pressable>
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
