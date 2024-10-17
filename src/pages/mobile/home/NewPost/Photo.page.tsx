import { useOnPageSwitch } from '@shared/hooks/useOnPageSwitch'
import { useUIStore } from '@shared/store/UIStore'
import Photo from '@widgets/photo/ui/Photo'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const PhotoPage = () => {
  const hideTabBar = useUIStore((state) => state.hideTabBar)
  const showTabBar = useUIStore((state) => state.showTabBar)

  useOnPageSwitch({
    onEnter: hideTabBar,
    onLeave: showTabBar,
  })

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
