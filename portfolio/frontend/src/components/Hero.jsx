import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import EditProfile from './EditProfile'
import './Hero.css'

function Hero() {
  const { profile } = useProfile()
  const [editing, setEditing] = useState(false)

  const nameParts = (profile?.name || 'Seble Mengistu').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  return (
    <section className="hero">
      <div className="container">
        <p className="hero-greeting">Welcome to my portfolio</p>
        <h1 className="hero-name">{firstName} <em>{lastName}</em></h1>
        <p className="hero-title">{profile?.title || 'Full Stack Developer'}</p>
        <div className="hero-divider" />
        <p className="hero-desc">{profile?.bio || 'I craft clean, purposeful web experiences using the MERN stack.'}</p>
        <div className="hero-cta">
          <a href="#projects" className="btn">View My Work</a>
          <button className="btn btn-edit" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      </div>
      {editing && <EditProfile onClose={() => setEditing(false)} />}
    </section>
  )
}

export default Hero
