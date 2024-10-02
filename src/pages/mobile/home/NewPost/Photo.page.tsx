import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useUIStore } from '@shared/store/UIStore'
import { useHideTabBar } from '@widgets/bottomTabBar/model/useHideTabBar'
import Photo from '@widgets/photo/ui/Photo'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NewPostNavigationParam } from 'src/app/navigation/mobile/types'

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
