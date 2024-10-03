import { tabBarHeight } from '@shared/constants'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { ModalView } from './ModalView'
import { OpenHeader } from './OpenHeader'
import { Overlay } from '@shared/ui/Overlay'
import { Location } from '@shared/types'
import { CloseHeader } from './CloseHeader'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  postPhotoUri: string
  location: Location
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

interface FormData {
  title: string
  description: string
}

export const CreatePostModal = ({
  isOpen,
  postPhotoUri,
  location,
  openModal,
  closeModal,
}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      title: '',
    },
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
  }
  return (
    <>
      <Overlay zIndex={1} onPress={closeModal} isActive={isOpen} />
      <ModalView isOpen={isOpen}>
        <OpenHeader isOpen={isOpen} onClick={openModal} />
        <CloseHeader isOpen={isOpen} onClick={closeModal} />

        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Title</Text>
            <View style={styles.withPadding}>
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
                    placeholder="Your title"
                  />
                )}
                name="title"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.withPadding}>
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.withPadding}>
              <Text>
                {location.lat} , {location.lng}
              </Text>
            </View>
          </View>

          <View style={styles.btnSection}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
              style={styles.submitBtn}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 25,
  },
  section: {
    gap: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  withPadding: {
    paddingLeft: 20,
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
  address: {},
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
