import {
  BottomTabBarProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomModal } from '@shared/ui/BottomModal'
import { Overlay } from '@shared/ui/Overlay'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import {
  HomeNavigationParam,
  MapNavigationParam,
} from 'src/app/navigation/mobile/types'

export const Post = () => {
  const { params } = useRoute<RouteProp<HomeNavigationParam>>()
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    navigation.setParams({
      postId: undefined,
    })
  }

  useEffect(() => {
    if (!params) return
    const postId = params.postId

    const isOpen = postId && postId !== 0 ? true : false

    setIsOpen(isOpen)
  }, [params])

  return (
    <>
      <Overlay
        backgroundColor="rgba(0,0,0,0.5)"
        onPress={closeModal}
        isActive={isOpen}
      />
      <BottomModal isOpen={isOpen}>
        <Text>post {params?.postId}</Text>
      </BottomModal>
    </>
  )
}
