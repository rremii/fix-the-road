import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { emailRegex } from '@shared/constants/emailRegex'
import { Button } from '@shared/ui/button'
import { InputWithLabel } from '@shared/ui/InputWithLabel'
import { authFormStyles } from '@shared/ui/styles/authFormStyles'
import React from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  AuthNavigationParam,
  SignUpNavigationParam,
} from 'src/app/navigation/types'
import { useLogin } from 'src/entities/auth/model/useLogin'

interface FormValues {
  email: string
}

export const SignUpEmailForm = () => {
  const navigation = useNavigation<StackNavigationProp<SignUpNavigationParam>>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  })

  const goToCode = ({ email }: FormValues) => {
    navigation.setOptions({
      headerShown: false,
    })
    navigation.navigate('code', { email })
  }

  const goToSignIn = () => {
    navigation.navigate('signIn')
  }

  return (
    <View style={authFormStyles.form}>
      <Text style={authFormStyles.title}>Sign Up</Text>

      <View style={authFormStyles.gapContainer}>
        <Controller
          control={control}
          rules={
            {
              // required: true,
              // pattern: emailRegex,
            }
          }
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              keyboardType="email-address"
              isError={!!errors.email}
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Button onPress={handleSubmit(goToCode)} type="filled">
          Next
        </Button>
      </View>
      <TouchableOpacity onPress={goToSignIn}>
        <Text style={authFormStyles.additionalInfo}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  )
}
