import { Platform } from 'react-native'
import { WebStorage } from '../secureStorage/web/storage'
import { NativeStorage } from './native/storage'
import { Storage } from '../persistSecureStorage/types'

export const SecureStorage = Platform.OS === 'web' ? WebStorage : NativeStorage
