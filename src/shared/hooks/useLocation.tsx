import { useEffect, useState } from 'react'

import * as Location from 'expo-location'

export const useLocation = () => {
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    setStatus(status)
  }
  const requestLocation = async () => {
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    requestPermission()
  }, [])
  useEffect(() => {
    if (!status) return

    if (status !== 'granted') {
      setErrorMsg(`Couldn't access location`)
      return
    }

    requestLocation()
  }, [status])

  return { location, errorMsg }
}
