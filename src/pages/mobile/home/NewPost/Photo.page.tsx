import Photo from '@widgets/photo/ui/Photo'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const PhotoPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Photo />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
