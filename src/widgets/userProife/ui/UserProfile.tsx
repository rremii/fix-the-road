import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Text,
  Platform,
} from 'react-native'
import { Avatar } from './Avatar'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'

type UserInfo = {
  userName: string
}

export const UserProfile = () => {
  const [isEditing, setEditing] = useState(false)

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

  const startEditing = () => {
    setEditing(true)
  }
  const onSave = (userInfo: UserInfo) => {
    console.log(userInfo)
    setEditing(false)

    reset()
  }

  return (
    <View style={styles.container}>
      <Avatar avatar={me?.avatar} size={200} />
      <View style={styles.form}>
        {isEditing ? (
          <>
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
          </>
        ) : (
          <>
            <Text style={styles.label}>{me?.userName}</Text>
          </>
        )}
      </View>

      <View style={styles.btnSection}>
        {isEditing ? (
          <Button onPress={handleSubmit(onSave)} type="filled">
            Save
          </Button>
        ) : (
          <Button onPress={startEditing} type="simple">
            Edit
          </Button>
        )}
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
  label: {
    fontSize: 18,
    lineHeight: 35,
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
    marginTop: 30,
  },
  btnSection: {
    padding: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
