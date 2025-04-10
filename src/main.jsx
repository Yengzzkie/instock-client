import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import WarehousePage from './pages/WarehousePage/WarehousePage.jsx'
import InventoryPage from './pages/InventoryPage/InventoryPage.jsx'
import WarehouseEdit from './components/WarehouseEdit/WarehouseEdit.jsx'
import WarehouseInventoryItem from './pages/WarehousePage/WarehousePage.jsx'
import InventoryTable from './components/InventoryTable/InventoryTable.jsx'
import ItemDetails from './components/ItemDetails/ItemDetails.jsx'
import WarehouseList from './components/WarehouseList/WarehouseList.jsx'
import InventoryEdit from './components/InventoryEdit/InventoryEdit.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    { path: "/", element: <HomePage /> },
    { path: "/warehouse", element: <WarehouseList /> },
    { path: "/warehouse/:id", element: <InventoryTable /> },
    { path: "/warehouse/edit/:id", element: <WarehouseEdit /> },
    { path: "/warehouse/:id/item/:itemid", element: <ItemDetails /> },
    { path: "/inventory", element: <InventoryPage /> },
    { path: "/inventory/:id", element: <InventoryPage /> }, // change element here to Inventory Details component
    { path: "/inventory/edit/:id", element: <InventoryEdit /> },
  ]},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)