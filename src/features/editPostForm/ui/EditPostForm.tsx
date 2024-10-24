import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@shared/ui/button'
import { useEditPostStore } from 'src/entities/post/model/editPostStore'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'
import { useUpdatePost } from 'src/entities/post/model/useUpdatePost'
import { textAreaSchema } from '@shared/constants/schemas'

interface FormData {
  description: string
}

interface Props {
  onSubmit: () => void
}
export const EditPostForm = (props: Props) => {
  const { description, lat, lng, id } = useEditPostStore((state) => state)

  const { isPending, updatePost } = useUpdatePost()

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

  const onSubmit = ({ description }: FormData) => {
    if (!id) return
    props.onSubmit()
    updatePost({
      id,
      description,
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
            {lat} , {lng}
          </Text>
        </View>
      </View>

      <View style={styles.btnSection}>
        <Button
          withSpinner
          pending={isPending}
          type="filled"
          onPress={handleSubmit(onSubmit)}
        >
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
    textAlignVertical: 'top',
    fontSize: 16,
    minHeight: 35,
    width: '100%',
    padding: 5,
    paddingLeft: 15,
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
