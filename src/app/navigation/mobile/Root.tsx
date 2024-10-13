import React, { useEffect } from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import AuthNavigation from './Auth'
import { RootNavigationParam } from './types'
import HomeNavigation from './Home'
import { useAuthStore } from 'src/entities/auth/model/useAuthStore'

const RootStack = createStackNavigator<RootNavigationParam>()

const RootNavigation = () => {
  const authState = useAuthStore((state) => state.authState)

  const routes: {
    name: keyof RootNavigationParam
    component: React.FC
  }[] =
    authState === 'success'
      ? [
          {
            name: 'home',
            component: HomeNavigation,
          },
        ]
      : [
          {
            name: 'auth',
            component: AuthNavigation,
          },
        ]

  return (
    <RootStack.Navigator screenOptions={StackOptions} initialRouteName={'home'}>
      {routes.map((route, index) => (
        <RootStack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </RootStack.Navigator>
  )
}
export default RootNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
}