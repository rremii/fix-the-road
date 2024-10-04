import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LikeIcon from '@icons/like.svg'

export const Like = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <LikeIcon width={30} height={30} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn: {},
})
