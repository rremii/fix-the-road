import React from 'react'
import { View, Text } from 'react-native'
import { NewPostNavigationParam } from './types'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack'
import { PhotoPage } from '@pages/mobile/home/NewPost/Photo.page'
import { PreviewPage } from '@pages/mobile/home/NewPost/Preview.page'

const NewPostStack = createStackNavigator<NewPostNavigationParam>()

const NewPostNavigation = () => {
  const routes: {
    name: keyof NewPostNavigationParam
    component: React.FC
  }[] = [
    {
      name: 'photo',
      component: PhotoPage,
    },
    {
      name: 'preview',
      component: PreviewPage,
    },
  ]

  return (
    <NewPostStack.Navigator
      screenOptions={StackOptions}
      initialRouteName={'photo'}
    >
      {routes.map((route, index) => (
        <NewPostStack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </NewPostStack.Navigator>
  )
}
export default NewPostNavigation
const StackOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}
