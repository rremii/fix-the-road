import { SignUpEmail } from '@widgets/signUpEmail/ui/SignUpEmail'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const EmailPage = () => {
  return (
    <View style={styles.pageContainer}>
      <SignUpEmail />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
