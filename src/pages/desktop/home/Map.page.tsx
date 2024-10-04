import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Map } from '@widgets/map/ui/Map'
import { OpenRightSideBar } from '@features/openRightSideBar/ui/OpenSideBar'
import { Burger } from '@features/burger/ui/Burger'
import { SideBarRight } from '@shared/ui/SideBarRight'
import { SideBarLeft } from '@shared/ui/SideBarLeft'
import { useUIStore } from '@shared/store/UIStore'

export const MapPage = () => {
  const isLeftSideBarOpen = useUIStore((state) => state.isLeftSideBar)
  const isRightSideBarOpen = useUIStore((state) => state.isRightSideBar)

  return (
    <View style={styles.pageContainer}>
      <Burger />
      <OpenRightSideBar />

      <Map />

      <SideBarLeft isOpen={isLeftSideBarOpen}></SideBarLeft>
      <SideBarRight isOpen={isRightSideBarOpen}></SideBarRight>
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
