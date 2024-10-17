export type ToastType = 'error' | 'warn'

export interface ToastInfo {
  type: ToastType
  content: string
  duration?: number
}

export interface IToast extends ToastInfo {
  //   isOpen: boolean
  id: number
}

type Action<T, P> = {
  type: T
  payload: P
}

export type AddToastAction = Action<'add', ToastInfo>
export type RemoveToastAction = Action<'remove', { id: number }>
export type CloseToastAction = Action<'close', { id: number }>

export type ToastAction = AddToastAction | RemoveToastAction | CloseToastAction
