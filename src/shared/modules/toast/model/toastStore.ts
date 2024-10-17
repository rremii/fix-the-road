import { createContext } from 'react'

import {
  AddToastAction,
  IToast,
  RemoveToastAction,
  ToastAction,
} from '../types'
import { DEFAULT_TOAST_DURATION } from '../constants'

interface InitialState {
  toasts: IToast[]
}

export const initialState: InitialState = {
  toasts: [],
}

export const ToastDispatchContext = createContext<React.Dispatch<ToastAction>>(
  () => {},
)
export const ToastContext = createContext<InitialState>({
  toasts: [],
})

export const ToastReducer = (
  state: InitialState,
  action: ToastAction,
): InitialState => {
  switch (action.type) {
    case 'add': {
      const maxToastId = state.toasts.at(-1)?.id || 0
      const id = maxToastId + 1

      const toast: IToast = {
        ...action.payload,
        duration: action.payload.duration || DEFAULT_TOAST_DURATION,
        id,
      }

      return {
        ...state,
        toasts: [...state.toasts, toast],
      }
    }

    case 'remove':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      }
    default:
      return state
  }
}

export function addToast(payload: IToast): AddToastAction {
  return {
    type: 'add',
    payload,
  }
}

export const removeToast = (payload: { id: number }): RemoveToastAction => ({
  type: 'remove',
  payload,
})
