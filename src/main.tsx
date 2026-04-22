import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Bootstrap } from './components/bootstrap/Bootstrap'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthProvider'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Bootstrap>
          <App />
        </Bootstrap>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)

