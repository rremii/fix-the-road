import React, { FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const withSaveArea = (Component: FC): FC => {
  return (props) => {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    )
  }
}
