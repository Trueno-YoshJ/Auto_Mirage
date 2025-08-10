import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import '../Sources/Dashboard.css'

const serviceData = [
  { name: 'Oil Change', value: 40 },
  { name: 'Battery Replacement', value: 25 },
  { name: 'General Repairs', value: 35 },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

const recentAppointments = [
  { name: 'Ruwan Perera', vehicle: 'Honda Civic', type: 'Oil Change', time: '10:30 AM', status: 'Pending' },
  { name: 'Nimal Silva', vehicle: 'Toyota Hilux', type: 'Brake Check', time: '11:15 AM', status: 'In Progress' },
]

const mechanics = [
  { name: 'Dinesh A.', jobs: 3, available: true },
  { name: 'Kasun M.', jobs: 5, available: false },
]

export default function Dashboard() {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
       <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout</button>
        <h1 className="section-title">AutoCare Hub – Dashboard</h1>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-title">Vehicles in Service</span>
            <span className="stat-value">12</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Upcoming Appointments</span>
            <span className="stat-value">8</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Services Completed</span>
            <span className="stat-value">150</span>
          </div>
        </div>

        <h2 className="section-title">Recent Appointments</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((a, index) => (
              <tr key={index}>
                <td>{a.name}</td>
                <td>{a.vehicle}</td>
                <td>{a.type}</td>
                <td>{a.time}</td>
                <td>
                  <span
                    className={
                      `status-badge ${
                        a.status === 'Pending'
                          ? 'status-pending'
                          : a.status === 'In Progress'
                          ? 'status-inprogress'
                          : 'status-completed'
                      }`
                    }
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="section-title">Service Requests Overview</h2>
        <div className="chart-box">
          <PieChart width={300} height={300}>
            <Pie data={serviceData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
              {serviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <h2 className="section-title">Mechanic Assignments</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned Jobs</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map((m, index) => (
              <tr key={index}>
                <td>{m.name}</td>
                <td>{m.jobs}</td>
                <td>
                  <span className={`status-badge ${m.available ? 'status-available' : 'status-busy'}`}>
                    {m.available ? 'Available' : 'Busy'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}