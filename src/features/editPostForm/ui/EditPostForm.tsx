import { tabBarHeight } from '@shared/constants'
import React, { FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Location } from '@shared/types'
import { IPost } from 'src/entities/post/types'
import { Button } from '@shared/ui/button'
import { useEditPostStore } from 'src/entities/post/model/editPostStore'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'

interface FormData {
  description: string
}

interface Props {
  onSubmit: () => void
}
export const EditPostForm = (props: Props) => {
  const { description, lat, lng } = useEditPostStore((state) => state)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: description || '',
    },
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: FormData) => {
    console.log(data)
    props.onSubmit()
    reset()
  }
  return (
    <View style={styles.container}>
      <View style={sectionStyles.section}>
        <Text style={sectionStyles.title}>Description</Text>
        <View style={sectionStyles.withPadding}>
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
                placeholder="Some cool description"
              />
            )}
            name="description"
          />
        </View>
      </View>

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.title}>Address</Text>
        <View style={sectionStyles.withPadding}>
          <Text style={sectionStyles.label}>
            {lat} , {lng}
          </Text>
        </View>
      </View>

      <View style={styles.btnSection}>
        <Button type="filled" onPress={handleSubmit(onSubmit)}>
          <Text>Save</Text>
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  input: {
    height: 35,
    width: '100%',
    padding: 5,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: '#d0bfff',
    color: '#69579b',
    borderWidth: 1,
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
