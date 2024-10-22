import React, { FC } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const withGestureHandler = (Component: FC): FC => {
  return (props) => {
    return (
      <GestureHandlerRootView>
        <Component {...props} />
      </GestureHandlerRootView>
    )
  }
}
