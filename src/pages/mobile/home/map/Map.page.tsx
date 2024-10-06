import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Map } from '@widgets/map/ui/Map'
import { tabBarHeight } from '@shared/constants'
import { PostModal } from '@pages/mobile/home/map/PostModal'

export const MapPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Map />
      <PostModal />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingBottom: tabBarHeight,
    position: 'relative',
  },
})
