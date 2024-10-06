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
import {
  HomeNavigationParam,
  MapNavigationParam,
} from 'src/app/navigation/mobile/types'
import { useGetPost } from 'src/entities/post/model/useGetPost'
import { useGetMe } from 'src/entities/user/model/useGetMe'

export const PostModal = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()
  const { params } = useRoute<RouteProp<HomeNavigationParam>>()
  //todo move to page
  const [isOpen, setIsOpen] = useState(false)

  const me = useGetMe()
  const post = useGetPost(params?.postId)

  useEffect(() => {
    if (!params) return
    const postId = params.postId

    const isOpen = postId && postId !== 0 ? true : false

    setIsOpen(isOpen)
  }, [params])

  const closeModal = () => {
    setIsOpen(false)

    const timeout = setTimeout(() => {
      navigation.setParams({
        postId: undefined,
      })

      clearTimeout(timeout)
    }, 300) //todo
  }
  const isMyPost = post?.userId === me?.id

  return (
    <>
      <Overlay
        backgroundColor="rgba(0,0,0,0.5)"
        onPress={closeModal}
        isActive={isOpen}
      />
      <BottomModal isOpen={isOpen}>
        {!post && <Text>LOADING fallback</Text>}
        {post && isMyPost && <EditablePost {...post} />}
        {post && !isMyPost && <Post {...post} />}
      </BottomModal>
    </>
  )
}
