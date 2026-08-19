import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import useReveal from '../hooks/useReveal'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PageShared.css'
import './AboutPage.css'

function AboutPage() {
  const { profile, loading: profileLoading } = useProfile()
  const skills = profile?.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML & CSS', 'Git', 'REST APIs']
  const [projectCount, setProjectCount] = useState(null)
  const headerRef = useReveal()
  const contentRef = useReveal()
  const statsRef = useReveal({ threshold: 0.3 })

  useEffect(() => {
    api.get('/api/projects').then(r => setProjectCount(r.data.length)).catch(() => {})
  }, [])

  return (
    <>
      <Navbar />
      <div className="main-content">
        <section className="page-header">
          <div className="container" ref={headerRef} data-reveal="fade-up">
            <Link to="/" className="back-link"><i className="fa fa-arrow-left" /> Back to Home</Link>
            <p className="section-subtitle">Who I am</p>
            <h1 className="page-title">About Me</h1>
            <div className="section-line" />
          </div>
        </section>

        <section className="page-body">
          <div className="container" ref={contentRef} data-reveal="fade-up">
            <div className="about-content">
              <div className="about-text">
                <p>{profile?.bio || 'I\'m a passionate full stack developer who loves building clean, user-friendly web applications. I enjoy turning complex problems into simple, beautiful solutions.'}</p>
                <p>I care about writing readable code and building interfaces that feel natural and intuitive to use. Every project is an opportunity to learn something new. I'm passionate about solving problems creatively and constantly pushing my skills further to build better digital experiences.</p>
                <div className="about-meta">
                  <div className="meta-item" style={{animationDelay: '0.1s'}}>
                    <i className="fa fa-map-marker-alt" />
                    <span>{profile?.location || 'Addis Ababa, Ethiopia'}</span>
                  </div>
                  <div className="meta-item" style={{animationDelay: '0.2s'}}>
                    <i className="fa fa-clock" />
                    <span>EAT (UTC+3)</span>
                  </div>
                  <div className="meta-item" style={{animationDelay: '0.3s'}}>
                    <i className="fa fa-envelope" />
                    <span>{profile?.email || 'seblemen94@gmail.com'}</span>
                  </div>
                </div>
                <div className="skills">
                  <p className="skills-label">Technologies</p>
                  <ul className="skills-list">
                    {skills.map((skill, i) => (
                      <li key={skill} className="skill-item" style={{animationDelay: `${i * 0.05}s`}}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="about-stats" ref={statsRef} data-reveal="fade-left">
                <div className="stat-item">
                  <div className="stat-number">{profile?.yearsExperience ?? 1}+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{projectCount !== null ? `${projectCount}+` : '...'}</div>
                  <div className="stat-label">Projects Built</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{skills.length}+</div>
                  <div className="stat-label">Technologies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">&#8734;</div>
                  <div className="stat-label">Passion for Code</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default AboutPage
