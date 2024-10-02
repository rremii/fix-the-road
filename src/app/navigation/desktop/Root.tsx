import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { RootNavigationParam } from './types'
import AuthNavigation from './Auth'
import { MapPage } from '@pages/desktop/home/Map.page'

const RootStack = createStackNavigator<RootNavigationParam>()

const RootNavigation = () => {
  const routes: {
    name: keyof RootNavigationParam
    component: React.FC
  }[] = [
    {
      name: 'map',
      component: MapPage,
    },
    {
      name: 'auth',
      component: AuthNavigation,
    },
  ]

  return (
    <RootStack.Navigator screenOptions={StackOptions} initialRouteName={'map'}>
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
