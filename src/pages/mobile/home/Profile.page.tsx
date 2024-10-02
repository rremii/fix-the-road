import { tabBarHeight } from '@shared/constants'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const ProfilePage = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>not implemented</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingBottom: tabBarHeight,
  },
})
