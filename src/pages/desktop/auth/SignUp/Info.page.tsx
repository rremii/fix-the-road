import { SignUpInfo } from '@widgets/signUpInfo/ui/SignUpInfo'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const InfoPage = () => {
  return (
    <View style={styles.pageContainer}>
      <SignUpInfo />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
