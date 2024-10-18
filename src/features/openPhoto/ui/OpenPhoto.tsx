import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PhotoIcon from '@icons/photo.svg'
import { PhotoPreview } from './PhotoPreview'

interface Props {
  photo: string
}

export const OpenPhoto = ({ photo }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <TouchableOpacity onPress={open} style={styles.btn}>
        <PhotoIcon width={35} height={35} />
      </TouchableOpacity>
      <PhotoPreview isOpen={isOpen} close={close} photo={photo} />
    </>
  )
}
const styles = StyleSheet.create({
  btn: {},
})
