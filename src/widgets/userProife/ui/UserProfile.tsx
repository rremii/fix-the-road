import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Avatar } from '../../../shared/ui/Avatar'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { AvatarPicker } from '@shared/ui/AvatarPicker'
import { EditUserProfile } from './EditUserProfile'

export const UserProfile = () => {
  const [isEditing, setEditing] = useState(false)

  const { me } = useGetMe()

  const startEditing = () => {
    setEditing(true)
  }
  const stopEditing = () => {
    setEditing(false)
  }

  if (isEditing) return <EditUserProfile onSubmit={stopEditing} />
  return (
    <View style={styles.container}>
      <Avatar avatar={me?.avatar} size={150} />
      <Text style={styles.label}>{me?.userName}</Text>

      <View style={styles.btnSection}>
        <Button onPress={startEditing} type="simple">
          Edit
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
  label: {
    marginTop: 20,
    fontSize: 22,
    lineHeight: 35,
  },

  btnSection: {
    padding: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
