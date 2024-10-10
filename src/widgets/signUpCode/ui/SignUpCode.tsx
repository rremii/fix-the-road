import { SignInForm } from '@features/signInForm/ui/SignInForm'
import { SignUpCodeForm } from '@features/signUpCodeForm/ui/SignUpCodeForm'
import { SignUpEmailForm } from '@features/signUpEmailForm/ui/SignUpEmailForm'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const SignUpCode = () => {
  return (
    <View style={styles.container}>
      <SignUpCodeForm />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
