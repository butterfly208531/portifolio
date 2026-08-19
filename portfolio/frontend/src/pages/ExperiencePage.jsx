import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { STUDENT_EXPERIENCE } from '../data'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PageShared.css'
import '../components/Experience.css'

function ExperiencePage() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const headerRef = useReveal()

  useEffect(() => {
    api.get('/api/experience')
      .then(r => setExperiences(r.data.length ? r.data : STUDENT_EXPERIENCE))
      .catch(() => setExperiences(STUDENT_EXPERIENCE))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="main-content">
        <section className="page-header">
          <div className="container" ref={headerRef} data-reveal="fade-up">
            <Link to="/" className="back-link"><i className="fa fa-arrow-left" /> Back to Home</Link>
            <p className="section-subtitle">Where I've worked</p>
            <h1 className="page-title">My Journey</h1>
            <div className="section-line" />
          </div>
        </section>

        <section className="page-body">
          <div className="container">
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            ) : (
              <div className="timeline">
                {experiences.map((exp, i) => (
                  <div key={exp._id} className="timeline-item" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="timeline-marker">
                      <div className="timeline-dot" />
                      {i < experiences.length - 1 && <div className="timeline-line" />}
                    </div>
                    <div className="timeline-content">
                      <div className="exp-header">
                        <div>
                          <h3 className="exp-title">{exp.title}</h3>
                          <p className="exp-company">{exp.company}</p>
                        </div>
                        <div className="exp-meta">
                          <span className="exp-duration">{exp.duration}</span>
                          <span className="exp-type">{exp.type}</span>
                        </div>
                      </div>
                      <ul className="exp-achievements">
                        {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default ExperiencePage
