import React, { FC, PropsWithChildren, useReducer } from 'react'
import {
  initialState,
  ToastContext,
  ToastDispatchContext,
  ToastReducer,
} from '../model/toastStore'
import { Toast } from './Toast'
import { ToastBox } from './ToastsBox'

interface Props extends PropsWithChildren {}

export const ToastProvider: FC<Props> = ({ children }) => {
  const [toastState, dispatch] = useReducer(ToastReducer, initialState)

  return (
    <ToastDispatchContext.Provider value={dispatch}>
      <ToastContext.Provider value={toastState}>
        <ToastBox>
          {toastState.toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </ToastBox>
        {children}
      </ToastContext.Provider>
    </ToastDispatchContext.Provider>
  )
}
