import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { useAuth } from '../context/AuthContext'
import EditProfile from './EditProfile'
import './Hero.css'

function Hero() {
  const { profile } = useProfile()
  const { isAdmin } = useAuth()
  const [editing, setEditing] = useState(false)

  const nameParts = (profile?.name || 'Seble Mengistu').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <p className="hero-greeting">
            <span className="hero-dot" /> Available for work
          </p>
          <h1 className="hero-name">
            {firstName}<br /><em>{lastName}</em>
          </h1>
          <p className="hero-title">{profile?.title || 'Full Stack Developer'}</p>
          <div className="hero-divider" />
          <p className="hero-desc">
            {profile?.bio || 'I craft clean, purposeful web experiences using the MERN stack — turning ideas into fast, accessible, and beautiful products.'}
          </p>
          <div className="hero-cta">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              <i className="fa fa-download" style={{ marginRight: '8px' }} />
              Resume
            </a>
            <a href="#contact" className="btn">Contact Me</a>
            {isAdmin && (
              <button className="btn btn-ghost" onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-frame">
            <div className="photo-placeholder">
              <i className="fa fa-user" />
              <span>Your Photo</span>
            </div>
          </div>
          <div className="photo-accent" />
        </div>
      </div>
      {editing && <EditProfile onClose={() => setEditing(false)} />}
    </section>
  )
}

export default Hero
