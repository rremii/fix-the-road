import { useHideTabBar } from '@widgets/bottomTabBar/model/useHideTabBar'
import Photo from '@widgets/photo/ui/Photo'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const PhotoPage = () => {
  useHideTabBar(['photo'])

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
