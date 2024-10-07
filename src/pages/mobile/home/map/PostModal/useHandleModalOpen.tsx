import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { modalSlideAnimDuration } from '@shared/constants'
import { useOnPageSwitch } from '@shared/hooks/useOnPageSwitch'
import { useEffect, useState } from 'react'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'

export const useHandleModalOpen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()

  const { params } = useRoute<RouteProp<HomeNavigationParam, 'map'>>()
  const [isOpen, setIsOpen] = useState(false)

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
    }, modalSlideAnimDuration)
  }

  useOnPageSwitch({
    onLeave: closeModal,
  })

  return {
    isOpen,
    closeModal,
  }
}