import compose from 'compose-function'
import { withNavigation } from './with-navigation'
import { withSaveArea } from './with-saveArea'
import { withGestureHandler } from './with-gestureHandler'

export const withProviders = compose(
  withNavigation,
  withSaveArea,
  withGestureHandler,
)
