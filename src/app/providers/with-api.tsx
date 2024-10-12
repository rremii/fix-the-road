import { queryApi } from '@shared/api/queryApi'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { FC } from 'react'

export const withApi =
  (Component: FC): FC =>
  (props) => {
    return (
      <QueryClientProvider client={queryApi}>
        <Component {...props} />
      </QueryClientProvider>
    )
  }
