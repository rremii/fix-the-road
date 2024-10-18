import React, { useEffect } from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import AuthNavigation from './Auth'
import { RootNavigationParam } from './types'
import HomeNavigation from './Home'
import { useAuthStore } from 'src/entities/auth/model/useAuthStore'
import { FallbackView } from '@shared/ui/FallbackView'

import * as SplashScreen from 'expo-splash-screen'

const RootStack = createStackNavigator<RootNavigationParam>()

const RootNavigation = () => {
  const authState = useAuthStore((state) => state.authState)

  useEffect(() => {
    if (!authState) return

    SplashScreen.hideAsync().catch((err) => console.log(err))
  }, [authState])

  if (!authState) return <FallbackView msg={'Authorization...'} />

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
