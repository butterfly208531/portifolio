import VisitorCounter from './VisitorCounter'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com/butterfly208531" target="_blank" rel="noreferrer" aria-label="GitHub">
          <i className="fab fa-github" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in" />
        </a>
        <a href="mailto:seblemen94@gmail.com" aria-label="Email">
          <i className="fa fa-envelope" />
        </a>
      </div>
      <p className="footer-copy">
        © {year} <span>Seble Mengistu</span>. Designed &amp; Built with care.
      </p>
      <VisitorCounter />
    </footer>
  )
}

export default Footer
