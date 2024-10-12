import compose from 'compose-function'
import { withNavigation } from './with-navigation'
import { withSaveArea } from './with-saveArea'
import { withGestureHandler } from './with-gestureHandler'
import { withToasts } from '@shared/modules/toast/model/withToasts'
import { withApi } from './with-api'

export const withProviders = compose(
  withNavigation,
  withSaveArea,
  withGestureHandler,
  withToasts,
  withApi,
)

//todo check optimization
