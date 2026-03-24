import { useProfile } from '../context/ProfileContext'
import './Footer.css'

function Footer() {
  const { profile } = useProfile()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-links">
        {profile?.github && (
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fab fa-github" />
          </a>
        )}
        {profile?.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
        )}
        {profile?.telegram && (
          <a href={profile.telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
            <i className="fab fa-telegram" />
          </a>
        )}
        {profile?.instagram && (
          <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
        )}
        {profile?.email && (
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <i className="fa fa-envelope" />
          </a>
        )}
      </div>
      <p className="footer-copy">
        © {year} <span>{profile?.name || 'Seble Mengistu'}</span>. Designed &amp; Built with care.
      </p>
    </footer>
  )
}

export default Footer
