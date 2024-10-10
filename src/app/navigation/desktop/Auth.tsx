import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import SignUpNavigation from './SignUp'
import { SignInPage } from '@pages/desktop/auth/SignIn.page'
import { AuthNavigationParam } from '../types'

const AuthStack = createStackNavigator<AuthNavigationParam>()

const AuthNavigation = () => {
  const routes: {
    name: keyof AuthNavigationParam
    component: React.FC
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
}
