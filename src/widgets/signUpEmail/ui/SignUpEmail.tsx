import { SignUpEmailForm } from '@features/signUpEmailForm/ui/SignUpEmailForm'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const SignUpEmail = () => {
  return (
    <View style={styles.container}>
      <SignUpEmailForm />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
