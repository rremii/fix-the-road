import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Map } from '@widgets/map/ui/Map'
import { tabBarHeight } from '@shared/constants'
import { PostModal } from '@pages/mobile/home/map/PostModal'
import { useOnPageSwitch } from '@shared/hooks/useOnPageSwitch'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'

export const MapPage = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()

  const clearParams = () => {
    navigation.setParams({
      postId: undefined,
    })
  }

  useOnPageSwitch({
    onLeave: clearParams,
  })

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
