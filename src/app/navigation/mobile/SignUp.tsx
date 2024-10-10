import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { EmailPage } from '@pages/mobile/auth/SignUp/Email.page'
import { CodePage } from '@pages/mobile/auth/SignUp/Code.page'
import { InfoPage } from '@pages/mobile/auth/SignUp/Info.page'
import { SignUpNavigationParam } from '../types'

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
  headerShown: true,
  headerTitle: 'Go back',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}
