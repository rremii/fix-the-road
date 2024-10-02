import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { SignUpNavigationParam } from './types'
import { EmailPage } from '@pages/mobile/auth/SignUp/Email.page'
import { CodePage } from '@pages/mobile/auth/SignUp/Code.page'
import { InfoPage } from '@pages/mobile/auth/SignUp/Info.page'

const SignUp = createStackNavigator<SignUpNavigationParam>()

const SignUpNavigation = () => {
  const routes: {
    name: keyof SignUpNavigationParam
    component: React.FC
  }[] = [
    {
      name: 'email',
      component: EmailPage,
    },
    {
      name: 'code',
      component: CodePage,
    },
    {
      name: 'info',
      component: InfoPage,
    },
  ]

  return (
    <SignUp.Navigator screenOptions={StackOptions} initialRouteName={'email'}>
      {routes.map((route, index) => (
        <SignUp.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </SignUp.Navigator>
  )
}
export default SignUpNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
}
