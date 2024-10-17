import React, { FC } from 'react'
import { ToastProvider } from '../ui/ToastProvider'

export const withToasts = (Component: FC): FC => {
  return (props) => {
    return (
      <ToastProvider>
        <Component {...props} />
      </ToastProvider>
    )
  }
}
