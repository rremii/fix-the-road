import { SignUpInfoForm } from '@features/signUpInfoForm/ui/SignUpInfoForm'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const SignUpInfo = () => {
  return (
    <View style={styles.container}>
      <SignUpInfoForm />
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
