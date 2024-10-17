import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from '@shared/ui/button'
import { InputWithLabel } from '@shared/ui/InputWithLabel'
import { authFormStyles } from '@shared/ui/styles/authFormStyles'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { SignUpNavigationParam } from 'src/app/navigation/types'
import { useVerifyCode } from 'src/entities/auth/model/useVerifyCode'

interface FormValues {
  code: string
}

export const SignUpCodeForm = () => {
  const navigation = useNavigation<StackNavigationProp<SignUpNavigationParam>>()
  const { params } = useRoute<RouteProp<SignUpNavigationParam, 'code'>>()

  const { verifyCode, isSuccess, isPending } = useVerifyCode()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: '',
    },
  })

  useEffect(() => {
    if (isSuccess) navigation.navigate('info', { email: params.email })
  }, [isSuccess])

  const onSubmit = ({ code }: FormValues) => {
    if (!params.email) return

    verifyCode(code)
  }

  return (
    <View style={authFormStyles.form}>
      <Text style={authFormStyles.title}>Code</Text>

      <View style={authFormStyles.gapContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              isError={!!errors.code}
              label="Enter your code"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="code"
        />
        <View style={authFormStyles.btnContainer}>
          <Button
            withSpinner
            pending={isPending}
            onPress={handleSubmit(onSubmit)}
            type="filled"
          >
            Next
          </Button>
        </View>
      </View>
    </View>
  )
}
