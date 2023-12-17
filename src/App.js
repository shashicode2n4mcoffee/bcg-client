import logo from './logo.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Details from './pages/Details'

const router = createBrowserRouter([
  {
    path: '/details/:id',
    element: <Details />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
