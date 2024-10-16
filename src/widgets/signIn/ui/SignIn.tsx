import { SignInForm } from '@features/signInForm/ui/SignInForm'
import { AvatarPicker } from '@shared/ui/AvatarPicker'
import { URIToFile } from '@shared/utils/URIToFile'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useRegister } from 'src/entities/auth/model/useRegister'

export const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>qweqeqweqwe</Text>
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
