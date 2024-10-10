import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Pressable,
} from 'react-native'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'

interface Props {
  initialAvatar?: string
  onChange: (avatar: string) => void
  size?: number
}
const fallbackAvatar = 'https://avatars.githubusercontent.com/u/100644973?v=4' //todo move to constants

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

    if (result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri)
      onChange(result.assets[0].uri)
    }
  }

  const styles = getStyles(size, windowWidth)
  return (
    <Pressable onPress={pickImageAsync} style={styles.container}>
      <Image style={styles.image} source={avatar || fallbackAvatar} />
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
