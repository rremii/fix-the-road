import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const linking = {
  prefixes: [prefix],
}
export const withNavigation = (Component: FC): FC => {
  return (props) => {
    return (
      <NavigationContainer linking={linking}>
        <Component {...props} />
      </NavigationContainer>
    )
  }
}
