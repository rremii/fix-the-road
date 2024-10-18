import { SignUpNavigationParam } from './types'
import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { EmailPage } from '@pages/desktop/auth/SignUp/Email.page'
import { CodePage } from '@pages/desktop/auth/SignUp/Code.page'
import { InfoPage } from '@pages/desktop/auth/SignUp/Info.page'

const SignUp = createStackNavigator<SignUpNavigationParam>()

const SignUpNavigation = () => {
  const routes: {
    name: keyof SignUpNavigationParam
    component: React.FC
    options?: StackNavigationOptions
  }[] = [
    {
      name: 'email',
      component: EmailPage,
      options: {
        title: 'Email',
      },
    },
    {
      name: 'code',
      component: CodePage,
      options: {
        title: 'Code',
      },
    },
    {
      name: 'info',
      component: InfoPage,
      options: {
        title: 'Info',
      },
    },
  ]

  return (
    <SignUp.Navigator screenOptions={StackOptions} initialRouteName={'email'}>
      {routes.map((route, index) => (
        <SignUp.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </SignUp.Navigator>
  )
}
export default SignUpNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
}
