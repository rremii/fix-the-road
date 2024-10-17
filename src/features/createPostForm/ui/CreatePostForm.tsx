import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { useCreatePostStore } from 'src/entities/post/model/createPostStore'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'
import { useCreatePost } from 'src/entities/post/model/useCreatePost'
import { useGetMe } from 'src/entities/user/model/useGetMe'

interface FormData {
  description: string
}

export const CreatePostForm = () => {
  const { location, photo } = useCreatePostStore((state) => state)

  const { me } = useGetMe()
  const { createPost, isPending } = useCreatePost()

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = async ({ description }: FormData) => {
    if (!photo || !me || !location) return

    await createPost({
      description,
      userId: me?.id,
      lat: location.lat,
      lng: location.lng,
      photoUri: photo,
    })
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
              required: true,
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
            {location?.lat} , {location?.lng}
          </Text>
        </View>
      </View>

      <View style={styles.btnSection}>
        <Button
          withSpinner
          pending={isPending}
          type="filled"
          mainColor="green"
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Create</Text>
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },

  input: {
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
  submitBtn: {
    padding: 7,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    backgroundColor: '#1ccb82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 17,
  },
  crossHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
})
