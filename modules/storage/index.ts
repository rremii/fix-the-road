import { Platform } from 'react-native'
import { AbstractStorage, ISingleStorage } from './types'
import { createStorage } from './createStorage'

// PLAYING AROUND WITH OOP
export class SingleStorage extends AbstractStorage {
  private static savedStorage: SingleStorage

  constructor(private readonly storage: AbstractStorage) {
    super()
    if (SingleStorage.savedStorage) return SingleStorage.savedStorage
    SingleStorage.savedStorage = this
  }

  getItem(key: string): Promise<string | null> {
    return this.storage.getItem(key)
  }

  setItem(key: string, value: string): Promise<void> {
    return this.storage.setItem(key, value)
  }

  removeItem(key: string): Promise<void> {
    return this.storage.removeItem(key)
  }
}

//main usage
export const storage = createStorage(Platform.OS)
