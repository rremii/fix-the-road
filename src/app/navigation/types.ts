import { StackNavigationProp } from '@react-navigation/stack'

export type AuthNavigationParam = {
  signIn: undefined
  signUp: StackNavigationProp<SignUpNavigationParam>
}

export type SignUpNavigationParam = {
  email: undefined
  code: CodeParam
  info: InfoParam
}
type CodeParam = {
  email: string
}
type InfoParam = {
  email: string
}
