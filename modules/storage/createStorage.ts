import { Platform } from 'react-native'
import { AbstractStorage } from './types'
import { NativeStorage } from './native/storage'
import { WebStorage } from './web/storage'

export const createStorage = (platform: Platform['OS']): AbstractStorage => {
  switch (platform) {
    case 'ios':
      return new NativeStorage()
    case 'android':
      return new NativeStorage()
    case 'web':
      return new WebStorage()
    default:
      return new NativeStorage()
  }
}
