import { modalSlideAnimDuration } from '@shared/constants'
import { Button } from '@shared/ui/button'
import React from 'react'
import { Text } from 'react-native'
import { useLogout } from 'src/entities/auth/model/useLogout'
import { useUIStore } from 'src/entities/ui/model/UIStore'

export const Logout = () => {
  const { logout, isPending } = useLogout()
  const closeMenu = useUIStore((state) => state.closeMenu)

  const onPress = () => {
    closeMenu('leftSideBar')

    const timer = setTimeout(() => {
      logout()
      clearTimeout(timer)
    }, modalSlideAnimDuration)
  }
  return (
    <Button withSpinner pending={isPending} onPress={onPress} type="danger">
      <Text>Logout</Text>
    </Button>
  )
}
