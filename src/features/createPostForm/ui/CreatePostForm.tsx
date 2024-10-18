import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { useCreatePostStore } from 'src/entities/post/model/createPostStore'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'
import { useCreatePost } from 'src/entities/post/model/useCreatePost'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { useUIStore } from 'src/entities/ui/model/UIStore'
import { textAreaSchema } from '@shared/constants/schemas'

interface FormData {
  description: string
}

export const CreatePostForm = () => {
  const { location, photo } = useCreatePostStore((state) => state)
  const closeMenu = useUIStore((state) => state.closeMenu)

  const { me } = useGetMe()
  const { createPost, isPending, isSuccess } = useCreatePost()

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    if (!isSuccess) return
    closeMenu('createPostModal')
  }, [isSuccess])

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
            rules={textAreaSchema}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                numberOfLines={3}
                multiline
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
    textAlignVertical: 'top',
    fontSize: 16,
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
