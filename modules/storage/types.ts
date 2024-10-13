export abstract class AbstractStorage {
  abstract getItem(key: string): Promise<string | null>
  abstract setItem(key: string, value: string): Promise<void>
  abstract removeItem(key: string): Promise<void>
}

export interface ISingleStorage {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}
