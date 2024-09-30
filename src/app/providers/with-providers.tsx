import compose from 'compose-function'
import { withNavigation } from './with-navigation'
import { withSaveArea } from './with-saveArea'

export const withProviders = compose(withNavigation, withSaveArea)
