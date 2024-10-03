import { tabBarHeight } from '@shared/constants'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ModalView } from './ModalView'
import { ToggleHeader } from './ToggleHeader'
import { Overlay } from '@shared/ui/Overlay'
import { Location } from '@shared/types'

interface Props {
  postPhotoUri: string
  location: Location
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const CreatePostModal = ({
  isOpen,
  postPhotoUri,
  location,
  openModal,
  closeModal,
}: Props) => {
  return (
    <>
      <Overlay zIndex={1} onPress={closeModal} isActive={isOpen} />
      <ModalView isOpen={isOpen}>
        <ToggleHeader isOpen={isOpen} onClick={openModal} />
      </ModalView>
    </>
  )
}
const styles = StyleSheet.create({})
