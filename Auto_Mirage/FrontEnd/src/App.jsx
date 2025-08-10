import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Maintenance from './pages/Maintenance'
import LayoutWithNavbar from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<LayoutWithNavbar />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  )
}

export default App
