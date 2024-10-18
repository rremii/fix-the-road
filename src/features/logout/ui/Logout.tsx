import {
  MODAL_SLIDE_ANIM_DURATION,
  TAB_BAR_SLIDE_DURATION,
} from '@shared/constants'
import { Button } from '@shared/ui/button'
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useAuthStore } from 'src/entities/auth/model/useAuthStore'
import { useLogout } from 'src/entities/auth/model/useLogout'
import { useUIStore } from 'src/entities/ui/model/UIStore'

export const Logout = () => {
  const { logout, isPending, isSuccess } = useLogout()
  const closeMenu = useUIStore((state) => state.closeMenu)
  const setAuthState = useAuthStore((state) => state.setAuthState)

  useEffect(() => {
    if (!isSuccess) return

    closeMenu('bottomTabBar')
    const timer = setTimeout(() => {
      setAuthState('rejected')
      clearTimeout(timer)
    }, TAB_BAR_SLIDE_DURATION)
  }, [isSuccess])

  const onPress = () => {
    closeMenu('leftSideBar')

    logout()
  }
  return (
    <Button withSpinner pending={isPending} onPress={onPress} type="danger">
      <Text>Logout</Text>
    </Button>
  )
}
