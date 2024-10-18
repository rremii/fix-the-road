import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { modalSlideAnimDuration } from '@shared/constants'
import { useOnPageSwitch } from '@shared/hooks/useOnPageSwitch'
import { useEffect, useState } from 'react'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { useMapStore } from 'src/entities/map/model/mapStore'
import { useUIStore } from 'src/entities/ui/model/UIStore'

export const useHandleModalOpen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()
  const { params } = useRoute<RouteProp<HomeNavigationParam, 'map'>>()

  const setChosenMarker = useMapStore((state) => state.setChosenMarkerId)
  const isPostModal = useUIStore((state) => state.postModal)
  const closeMenu = useUIStore((state) => state.closeMenu)
  const openMenu = useUIStore((state) => state.openMenu)

  useEffect(() => {
    if (!params) return
    const postId = params.postId

    if (!!postId && postId !== 0) openMenu('postModal')
    else closeMenu('postModal')
  }, [params])

  const closeModal = () => {
    closeMenu('postModal')
    setChosenMarker(null)
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
    isOpen: isPostModal,
    closeModal,
  }
}
