import React, { useState } from 'react'
import { Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import PhotoIcon from '@icons/photo.svg'
import { PhotoPreview } from './PhotoPreview'

interface Props {
  photoUri: string
}

export const OpenPhoto = ({ photoUri }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <TouchableOpacity onPress={open} style={styles.btn}>
        <PhotoIcon width={35} height={35} />
      </TouchableOpacity>
      <PhotoPreview isOpen={isOpen} close={close} photoUri={photoUri} />
    </>
  )
}
const styles = StyleSheet.create({
  btn: {},
})
