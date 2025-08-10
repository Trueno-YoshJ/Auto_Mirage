import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/services" className="nav-link">Services</Link>
      <Link to="/maintenance" className="nav-link">Maintenances</Link>
    </nav>
  )
}
