import { AbstractStorage } from '../types'

export class WebStorage implements AbstractStorage {
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key))
  }

  setItem(key: string, value: string): Promise<void> {
    return Promise.resolve(localStorage.setItem(key, value))
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key))
  }
}
