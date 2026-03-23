import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Login from './Login'
import './Navbar.css'

const sections = ['about', 'projects', 'experience', 'services', 'contact']

function Navbar() {
  const { theme, toggle } = useTheme()
  const { auth, logout, isAdmin } = useAuth()
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="logo">SM</a>
        <div className="nav-right">
          <ul className="nav-links">
            {sections.map((s) => (
              <li key={s}>
                <a href={`#${s}`} className={active === s ? 'active' : ''}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          {isAdmin ? (
            <div className="nav-admin">
              <span className="admin-badge">Admin</span>
              <button className="btn-logout" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="btn-login" onClick={() => setShowLogin(true)}>Login</button>
          )}
        </div>
      </div>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </nav>
  )
}

export default Navbar
