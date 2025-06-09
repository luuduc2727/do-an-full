import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import React from 'react'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import UserProvider from './components/cv/context/userContext';

const persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <App />
        </UserProvider>
      </PersistGate>

      <Toaster />
    </Provider>
  </React.StrictMode>,
)
