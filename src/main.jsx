import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
