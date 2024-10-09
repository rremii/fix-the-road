import { SignInForm } from '@features/signInForm/ui/SignInForm'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useToast } from '@shared/modules/toast/model/useToast'
import { authFormStyles } from '@shared/ui/styles/authFormStyles'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AuthNavigationParam } from 'src/app/navigation/types'

export const SignIn = () => {
  const { openToast } = useToast()

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
