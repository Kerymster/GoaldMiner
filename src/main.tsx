import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Bootstrap } from './components/Bootstrap'
import './index.css'
import App from './App.tsx'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Bootstrap>
        <App />
      </Bootstrap>
    </Provider>
  </StrictMode>,
)
