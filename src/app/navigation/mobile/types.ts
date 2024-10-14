import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthNavigationParam } from '../types'

export type RootNavigationParam = {
  auth: StackNavigationProp<AuthNavigationParam>
  home: BottomTabNavigationProp<HomeNavigationParam>
}

export type HomeNavigationParam = {
  map: MapNavigationParam
  profile: undefined
  newPost: StackNavigationProp<NewPostNavigationParam>
}

export type MapNavigationParam = {
  postId?: number
}

export type NewPostNavigationParam = {
  photo: undefined
  preview: undefined
}
