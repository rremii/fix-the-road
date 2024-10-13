import { SignUpCode } from '@widgets/signUpCode/ui/SignUpCode'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const CodePage = () => {
  return (
    <View style={styles.pageContainer}>
      <SignUpCode />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})