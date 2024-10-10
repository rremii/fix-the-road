import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LikeIcon from '@icons/like.svg'

export const Like = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <LikeIcon color="transparent" width={35} height={35} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn: {
    transform: [{ translateY: -2 }], //todo change img to good one
  },
})
