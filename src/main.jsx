import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import Table from './components/Table/Table.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    { path: "/", element: <HomePage /> },
    { path: "/inventory", element: <Table /> },
  ]},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
