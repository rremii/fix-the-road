import { Platform } from 'react-native'
import MobileNavigation from './mobile/Root'
import DesktopNavigation from './desktop/Root'
import * as Device from 'expo-device'
import React, { useEffect, useState } from 'react'
import { FallbackView } from '@shared/ui/FallbackView'

export const RootNavigation = () => {
  const [deviceType, setDeviceType] = useState<Device.DeviceType>()

  useEffect(() => {
    Device.getDeviceTypeAsync()
      .then((type) => {
        setDeviceType(type)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (deviceType === Device.DeviceType.PHONE) return <MobileNavigation />
  if (deviceType === Device.DeviceType.DESKTOP) return <DesktopNavigation />
  return <FallbackView msg={'fetching device type'} />
}
