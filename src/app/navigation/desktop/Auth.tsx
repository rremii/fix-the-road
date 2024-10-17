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
    options?: StackNavigationOptions
  }[] = [
    {
      name: 'signIn',
      component: SignInPage,
      options: {
        title: 'Sign In',
      },
    },
    {
      name: 'signUp',
      component: SignUpNavigation,
      options: {
        title: 'Sign Up',
      },
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
          options={route.options}
        />
      ))}
    </AuthStack.Navigator>
  )
}
export default AuthNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
}
