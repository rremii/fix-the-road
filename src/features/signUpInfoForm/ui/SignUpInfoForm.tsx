import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { emailRegex } from '@shared/constants/emailRegex'
import { Button } from '@shared/ui/button'
import { InputWithLabel } from '@shared/ui/InputWithLabel'
import { authFormStyles } from '@shared/ui/styles/authFormStyles'
import { Avatar } from '@shared/ui/Avatar'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  AuthNavigationParam,
  SignUpNavigationParam,
} from 'src/app/navigation/types'
import { useLogin } from 'src/entities/auth/model/useLogin'
import * as ImagePicker from 'expo-image-picker'
import { AvatarPicker } from '@shared/ui/AvatarPicker'
import DefaultAvatar from '@icons/defaultAvatar.png'
import { RootNavigationParam } from 'src/app/navigation/desktop/types'
import { useRegister } from 'src/entities/auth/model/useRegister'
import { URIToFile } from '@shared/utils/uriToFile'
import { FormDataAsset } from '@shared/types'

interface FormValues {
  userName: string
  password: string
}

export const SignUpInfoForm = () => {
  const { params } = useRoute<RouteProp<SignUpNavigationParam, 'info'>>()

  const { register, isPending } = useRegister()

  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const onSubmit = ({ password, userName }: FormValues) => {
    if (!params) return
    const formDataAvatar: FormDataAsset = {
      uri: avatar?.uri || '',
      name: avatar?.fileName || '',
      type: avatar?.mimeType || '',
    }
    register({
      password,
      userName,
      email: params.email,
      avatar: formDataAvatar,
    })
    reset()
  }

  return (
    <View style={authFormStyles.form}>
      <View style={styles.avatarContainer}>
        <AvatarPicker
          size={150}
          initialAvatar={DefaultAvatar}
          onChange={setAvatar}
        />
      </View>
      <View style={authFormStyles.gapContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              isError={!!errors.password}
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              keyboardType="visible-password"
              isError={!!errors.password}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        <View style={authFormStyles.btnContainer}>
          <Button
            withSpinner
            pending={isPending}
            onPress={handleSubmit(onSubmit)}
            type="filled"
          >
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
})
