import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routs/Routs'
import DealsProvider from './Provider/DealsProvider'
import AuthProvider from './Provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <DealsProvider>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </DealsProvider>
)
