import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Map } from '@widgets/map/ui/Map'
import { Burger } from '@widgets/sideBarLeft/ui/Burger'
import { OpenSideBar } from '@widgets/sideBarRight/ui/OpenSideBar'

export const MapPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Burger />
      <Map />
      <OpenSideBar />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
