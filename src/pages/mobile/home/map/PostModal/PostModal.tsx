import {
  BottomTabBarProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomModal } from '@shared/ui/BottomModal'
import { Overlay } from '@shared/ui/Overlay'
import { EditablePost } from '@widgets/editablePost/ui/EditablePost'
import { Post } from '@widgets/post/ui/Post'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useGetPost } from 'src/entities/post/model/useGetPost'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { useHandleModalOpen } from './useHandleModalOpen'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { PendingView } from '@shared/ui/PendingView'

export const PostModal = () => {
  const { params } = useRoute<RouteProp<HomeNavigationParam, 'map'>>()

  const { isOpen, closeModal } = useHandleModalOpen()
  const me = useGetMe()
  const post = useGetPost(params?.postId)

  const isMyPost = post?.userId === me?.id

  return (
    <>
      <Overlay
        backgroundColor="rgba(0,0,0,0.5)"
        onPress={closeModal}
        isActive={isOpen}
      />
      <BottomModal closeModal={closeModal} isOpen={isOpen}>
        {!post && <PendingView msg="Loading post..." withSpinner />}
        {post && isMyPost && <EditablePost {...post} />}
        {post && !isMyPost && <Post {...post} />}
      </BottomModal>
    </>
  )
}
