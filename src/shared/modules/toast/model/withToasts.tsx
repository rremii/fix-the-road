import React from 'react'
import { FC } from 'react'
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
