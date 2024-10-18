import { SignUpCodeForm } from '@features/signUpCodeForm/ui/SignUpCodeForm'
import React from 'react'
import { StyleSheet, View } from 'react-native'

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
