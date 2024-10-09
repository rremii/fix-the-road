import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Text,
  Platform,
} from 'react-native'
import { Avatar } from '../../../shared/ui/Avatar'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { AvatarPicker } from '@shared/ui/AvatarPicker'

type UserInfo = {
  userName: string
}

interface Props {
  onSubmit: () => void
}

export const EditUserProfile = ({ onSubmit }: Props) => {
  const [newAvatar, setAvatar] = useState('')
  const me = useGetMe()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: {
      userName: me?.userName || '',
    },
  })

  const onSave = (userInfo: UserInfo) => {
    console.log(userInfo)

    onSubmit()
    reset()
  }

  return (
    <View style={styles.container}>
      <AvatarPicker
        onChange={setAvatar}
        initialAvatar={me?.avatar}
        size={150}
      />
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder="New user name"
            />
          )}
          name="userName"
        />
      </View>

      <View style={styles.btnSection}>
        <Button onPress={handleSubmit(onSave)} type="filled">
          Save
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '30%',
    flex: 1,
    alignItems: 'center',
  },

  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderColor: '#8181818d',
    borderWidth: 1,
  },
  form: {
    marginTop: 20,
  },
  btnSection: {
    padding: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
