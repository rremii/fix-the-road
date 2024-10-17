import { SignInForm } from '@features/signInForm/ui/SignInForm'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const SignIn = () => {
  return (
    <View style={styles.container}>
      <SignInForm />
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
