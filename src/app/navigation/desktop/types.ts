import { StackNavigationProp } from '@react-navigation/stack'
import { AuthNavigationParam } from '../types'

export type RootNavigationParam = {
  auth: StackNavigationProp<AuthNavigationParam>
  map: MapNavigationParam
}

export type MapNavigationParam = {
  postId?: number
}
