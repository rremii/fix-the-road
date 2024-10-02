import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'

export const withNavigation = (Component: FC): FC => {
  return (props) => {
    return (
      <NavigationContainer>
        <Component {...props} />
      </NavigationContainer>
    )
  }
}
