import { useCameraPermissions } from 'expo-camera'
import React from 'react'
import { useEffect } from 'react'
import { View, Text } from 'react-native'

export const useHandleCameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    if (permission?.status !== 'granted') {
      requestPermission()
    }
  }, [permission])

  if (!permission?.granted) {
    return (
      <View>
        <Text>You need to grant camera permission to use this app</Text>
      </View>
    )
  }
}
