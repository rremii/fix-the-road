import React from 'react'
import { AppLayout } from './layout/AppLayout'
import { RootNavigation } from './navigation'
import { withProviders } from './providers/with-providers'

function App() {
  return (
    <AppLayout>
      <RootNavigation />
    </AppLayout>
  )
}

export const RootApp = withProviders(App)
