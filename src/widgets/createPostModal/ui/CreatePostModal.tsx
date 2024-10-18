import React, { useState } from 'react'
import { ModalView } from './ModalView'
import { OpenHeader } from './OpenHeader'
import { Overlay } from '@shared/ui/Overlay'
import { CloseHeader } from './CloseHeader'
import { CreatePostForm } from '@features/createPostForm/ui/CreatePostForm'
import { useUIStore } from 'src/entities/ui/model/UIStore'

export const CreatePostModal = () => {
  const isCreatePostModal = useUIStore((state) => state.createPostModal)
  const closeMenu = useUIStore((state) => state.closeMenu)
  const openMenu = useUIStore((state) => state.openMenu)

  const openModal = () => openMenu('createPostModal')
  const closeModal = () => closeMenu('createPostModal')
  return (
    <>
      <Overlay zIndex={1} onPress={closeModal} isActive={isCreatePostModal} />
      <ModalView
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isCreatePostModal}
      >
        <OpenHeader isOpen={isCreatePostModal} onClick={openModal} />
        <CloseHeader isOpen={isCreatePostModal} onClick={closeModal} />

        <CreatePostForm />
      </ModalView>
    </>
  )
}
