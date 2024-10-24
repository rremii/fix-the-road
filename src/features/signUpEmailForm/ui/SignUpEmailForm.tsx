import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { EMAIL_REGEX } from '@shared/constants/regex'
import { Button } from '@shared/ui/button'
import { InputWithLabel } from '@shared/ui/InputWithLabel'
import { authFormStyles } from '@shared/ui/styles/authFormStyles'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { SignUpNavigationParam } from 'src/app/navigation/types'
import { useSendCode } from 'src/entities/auth/model/useSendCode'

interface FormValues {
  email: string
}

export const SignUpEmailForm = () => {
  const navigation = useNavigation<StackNavigationProp<SignUpNavigationParam>>()

  const { sendCode, isSuccess, isPending } = useSendCode()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    const email = watch('email')

    if (isSuccess && email) navigation.navigate('code', { email })
  }, [isSuccess])

  const onSubmit = ({ email }: FormValues) => {
    sendCode(email)
  }

  const goToSignIn = () => {
    navigation.goBack()
  }

  return (
    <View style={authFormStyles.form}>
      <Text style={authFormStyles.title}>Sign Up</Text>

      <View style={authFormStyles.gapContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              keyboardType="email-address"
              isError={!!errors.email}
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="email"
        />
        <Button
          withSpinner
          pending={isPending}
          onPress={handleSubmit(onSubmit)}
          type="filled"
        >
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
