import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Map } from '@widgets/map/ui/Map'
import { Burger } from '@features/toggleLeftSideBar/ui/Burger'
import { SideBarRight } from '@shared/ui/SideBarRight'
import { SideBarLeft } from '@shared/ui/SideBarLeft'
import { useUIStore } from '@shared/store/UIStore'
import { Posts } from '@pages/desktop/home/map/Posts'
import { ToggleRightSideBar } from '@features/toggleRightSideBar/ui/ToggleRightSideBar'
import { UserProfile } from '@widgets/userProife/ui/UserProfile'

export const MapPage = () => {
  const isLeftSideBarOpen = useUIStore((state) => state.isLeftSideBar)
  const isRightSideBarOpen = useUIStore((state) => state.isRightSideBar)

  return (
    <View style={styles.pageContainer}>
      <Map />

      <SideBarLeft isOpen={isLeftSideBarOpen}>
        <Burger />
        <UserProfile />
      </SideBarLeft>
      <SideBarRight isOpen={isRightSideBarOpen}>
        <ToggleRightSideBar />
        <Posts />
      </SideBarRight>
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
