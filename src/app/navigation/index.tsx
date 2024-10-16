import { Platform } from 'react-native'
import MobileNavigation from './mobile/Root'
import DesktopNavigation from './desktop/Root'
import React from 'react'

export const RootNavigation = () => {
  return false ? <MobileNavigation /> : <DesktopNavigation />
  // return <DesktopNavigation />
}
