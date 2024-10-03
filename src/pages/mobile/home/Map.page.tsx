import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Map } from '@widgets/map/ui/Map'
import { tabBarHeight } from '@shared/constants'

export const MapPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Map />
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
