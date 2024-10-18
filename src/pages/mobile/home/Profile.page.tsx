import { TAB_BAR_HEIGHT } from '@shared/constants'
import { UserProfile } from '@widgets/userProife/ui/UserProfile'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const ProfilePage = () => {
  return (
    <View style={styles.pageContainer}>
      <UserProfile />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingBottom: TAB_BAR_HEIGHT,
  },
})
