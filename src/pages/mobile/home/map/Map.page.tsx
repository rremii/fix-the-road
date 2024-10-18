import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Map } from '@widgets/map/ui/Map'
import { TAB_BAR_HEIGHT } from '@shared/constants'
import { PostModal } from '@pages/mobile/home/map/postModal/PostModal'

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
    paddingBottom: TAB_BAR_HEIGHT,
    position: 'relative',
  },
})
