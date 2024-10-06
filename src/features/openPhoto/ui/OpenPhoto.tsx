import React from 'react'
import { Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import PhotoIcon from '@icons/photo.svg'

export const OpenPhoto = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <PhotoIcon width={35} height={35} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn: {},
})
