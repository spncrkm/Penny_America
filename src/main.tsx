import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-xm80oowxbq43eleq.us.auth0.com'
      clientId='CegeJ9Wo9jdliw761S5GtIgwv7SZCRxm'
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      >
      <App />
      </Auth0Provider>
  </React.StrictMode>,
)
