import { tabBarHeight } from '@shared/constants'
import React, { useEffect, useState } from 'react'
import { ModalView } from './ModalView'
import { OpenHeader } from './OpenHeader'
import { Overlay } from '@shared/ui/Overlay'
import { Location } from '@shared/types'
import { CloseHeader } from './CloseHeader'
import { CreatePostForm } from '@features/createPostForm/ui/CreatePostForm'

export const CreatePostModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <Overlay zIndex={1} onPress={closeModal} isActive={isOpen} />
      <ModalView closeModal={closeModal} openModal={openModal} isOpen={isOpen}>
        <OpenHeader isOpen={isOpen} onClick={openModal} />
        <CloseHeader isOpen={isOpen} onClick={closeModal} />

        <CreatePostForm />
      </ModalView>
    </>
  )
}
