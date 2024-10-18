import React, { useEffect } from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import SignUpNavigation from './SignUp'
import { SignInPage } from '@pages/mobile/auth/SignIn.page'
import { AuthNavigationParam } from '../types'
import * as SplashScreen from 'expo-splash-screen'

const AuthStack = createStackNavigator<AuthNavigationParam>()

const AuthNavigation = () => {
  const routes: {
    name: keyof AuthNavigationParam
    component: React.FC
    options?: StackNavigationOptions
  }[] = [
    {
      name: 'signIn',
      component: SignInPage,
    },
    {
      name: 'signUp',
      component: SignUpNavigation,
    },
  ]

  return (
    <AuthStack.Navigator
      screenOptions={StackOptions}
      initialRouteName={'signIn'}
    >
      {routes.map((route, index) => (
        <AuthStack.Screen
          options={route.options}
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </AuthStack.Navigator>
  )
}
export default AuthNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}
