import { SignIn } from '@widgets/signIn/ui/SignIn'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const SignInPage = () => {
  return (
    <View style={styles.pageContainer}>
      <SignIn />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
