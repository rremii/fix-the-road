import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Map } from '@widgets/map/ui/Map'
import { OpenRightSideBar } from '@features/openRightSideBar/ui/OpenSideBar'
import { Burger } from '@features/burger/ui/Burger'
import { SideBarRight } from '@widgets/sideBarRight/ui/SideBarRight'
import { SideBarLeft } from '@widgets/sideBarLeft/ui/SideBarLeft'

export const MapPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Burger />
      <OpenRightSideBar />

      <Map />

      <SideBarLeft />
      <SideBarRight />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
