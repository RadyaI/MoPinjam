import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <meta name="description" content="Sistem peminjaman buku online untuk perpustakaan" />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
