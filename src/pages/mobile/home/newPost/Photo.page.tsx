import { useOnPageSwitch } from '@shared/hooks/useOnPageSwitch'
import { useUIStore } from 'src/entities/ui/model/UIStore'
import Photo from '@widgets/photo/ui/Photo'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const PhotoPage = () => {
  const closeMenu = useUIStore((state) => state.closeMenu)
  const openMenu = useUIStore((state) => state.openMenu)

  useOnPageSwitch({
    onEnter: () => closeMenu('bottomTabBar'),
    onLeave: () => openMenu('bottomTabBar'),
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
