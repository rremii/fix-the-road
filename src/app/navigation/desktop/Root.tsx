import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { RootNavigationParam } from './types'
import AuthNavigation from './Auth'
import { MapPage } from '@pages/desktop/home/map/Map.page'
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
            name: 'map',
            component: MapPage,
          },
        ]
      : [
          {
            name: 'auth',
            component: AuthNavigation,
          },
        ]

  return (
    <RootStack.Navigator screenOptions={StackOptions} initialRouteName={'auth'}>
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
