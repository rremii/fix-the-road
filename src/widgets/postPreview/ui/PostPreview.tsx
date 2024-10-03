import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Map } from '@modules/map'
import { Portal } from '@gorhom/portal'
import { CreatePostModal } from './CreatePostModal'
import { Overlay } from '@shared/Overlay'

interface Props {
  postPhotoUri: string
}

export const PostPreview = ({ postPhotoUri }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <View style={styles.container}>
        <Map initCoords={{ lat: 49.212, lng: 16.6266 }} />
      </View>
      <Overlay
        backgroundColor="transparent"
        zIndex={1}
        onPress={closeModal}
        isActive={isOpen}
      />
      <CreatePostModal
        postPhotoUri={postPhotoUri}
        openModal={openModal}
        isOpen={isOpen}
      />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
