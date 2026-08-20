import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Login from '../components/Login'
import './ViewsPage.css'

function ViewsPage() {
  const { auth, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [stats, setStats] = useState(null)
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    if (!isAdmin) return
    fetchStats()
    fetchVisitors()
  }, [isAdmin])

  const fetchStats = () => {
    api.get('/api/views/stats', {
      headers: { Authorization: `Bearer ${auth?.token}` }
    }).then(r => setStats(r.data)).catch(() => {})
  }

  const fetchVisitors = () => {
    api.get('/api/visitors').then(r => setVisitorCount(r.data.count || 0)).catch(() => {})
  }

  if (!isAdmin) {
    return (
      <div className="views-page">
        <div className="views-auth">
          <p>Admin access required</p>
          <button className="btn btn-primary" onClick={() => setShowLogin(true)}>Login</button>
          {showLogin && <Login onLogin={() => { setShowLogin(false); window.location.reload() }} />}
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    )
  }

  const items = [
    { label: 'Today', value: stats?.today ?? 0, icon: 'fa-calendar-day' },
    { label: 'This Week', value: stats?.thisWeek ?? 0, icon: 'fa-calendar-week' },
    { label: 'This Month', value: stats?.thisMonth ?? 0, icon: 'fa-calendar-alt' },
    { label: 'This Year', value: stats?.thisYear ?? 0, icon: 'fa-calendar' },
    { label: 'Total Views', value: stats?.total ?? 0, icon: 'fa-chart-line' },
  ]

  return (
    <div className="views-page">
      <aside className="views-sidebar">
        <div className="views-sidebar-header">
          <i className="fa fa-chart-bar" />
          <h2>Analytics</h2>
        </div>
        <div className="views-sidebar-stats">
          {items.map(item => (
            <div key={item.label} className="views-sidebar-stat">
              <i className={`fa ${item.icon}`} />
              <div className="views-sidebar-stat-info">
                <span className="views-sidebar-stat-value">{item.value}</span>
                <span className="views-sidebar-stat-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="views-sidebar-footer">
          <div className="views-sidebar-visitor">
            <i className="fa fa-users" />
            <span>{visitorCount}</span>
            <label>Visitors</label>
          </div>
          <button className="views-back-btn" onClick={() => navigate('/admin')}>
            <i className="fa fa-arrow-left" /> Back to Admin
          </button>
          <a href="/" className="views-site-link" target="_blank" rel="noreferrer">
            <i className="fa fa-external-link-alt" /> View Site
          </a>
        </div>
      </aside>

      <main className="views-main">
        <div className="views-main-header">
          <h1>View Analytics</h1>
        </div>
        <div className="views-grid">
          {items.map(item => (
            <div key={item.label} className="views-card">
              <i className={`fa ${item.icon}`} />
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
          <div className="views-card views-card-visitor">
            <i className="fa fa-users" />
            <h3>{visitorCount}</h3>
            <p>Total Visitors</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ViewsPage
