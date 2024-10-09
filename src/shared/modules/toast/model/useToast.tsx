import { useCallback, useContext, useEffect } from 'react'
import {
  addToast,
  removeToast,
  ToastContext,
  ToastDispatchContext,
} from './toastStore'
import { ToastInfo } from '../types'

export const useToast = () => {
  const dispatch = useContext(ToastDispatchContext)

  const openToast = (toastInfo: ToastInfo) => {
    dispatch(addToast(toastInfo))
  }

  const close = (id: number) => {
    dispatch(removeToast({ id }))
  }

  return { openToast, closeToast: close }
}
