import { StackNavigationProp } from '@react-navigation/stack'

export type RootNavigationParam = {
  auth: StackNavigationProp<AuthNavigationParam>
  map: MapNavigationParam
}

export type MapNavigationParam = {
  postId?: number
}

export type AuthNavigationParam = {
  signIn: undefined
  signUp: StackNavigationProp<SignUpNavigationParam>
}

export type SignUpNavigationParam = {
  email: undefined
  code: undefined
  info: undefined
}
