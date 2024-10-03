import { useHideTabBar } from '@widgets/BottomTabBar/model/useHideTabBar'
import Photo from '@widgets/photo/ui/Photo'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const PhotoPage = () => {
  useHideTabBar()

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
