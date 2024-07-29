import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { ptBR } from '@clerk/localizations'

import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      localization={ptBR}
      afterSignOutUrl="/"
      appearance={{ baseTheme: dark }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
