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
import { AuthNavigationParam } from 'src/app/navigation/types'
import { useLogin } from 'src/entities/auth/model/useLogin'

interface FormValues {
  email: string
  password: string
}

export const SignInForm = () => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParam>>()

  const { login, isPending, isError } = useLogin()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isError) reset()
  }, [isError])

  const goToSignUp = () => {
    navigation.navigate('signUp')
  }

  const signIn = (formValues: FormValues) => {
    login()
  }

  return (
    <View style={authFormStyles.form}>
      <Text style={authFormStyles.title}>Sign In</Text>

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
              isError={!!errors.email || isError}
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              keyboardType="visible-password"
              isError={!!errors.password || isError}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />

        <Button
          pending={isPending}
          onPress={handleSubmit(signIn)}
          withSpinner={true}
          type="filled"
          btnStyles={authFormStyles.submitBtn}
        >
          Sign In
        </Button>
      </View>
      <TouchableOpacity onPress={goToSignUp}>
        <Text style={authFormStyles.additionalInfo}>
          Don't have an account?
        </Text>
      </TouchableOpacity>
    </View>
  )
}
