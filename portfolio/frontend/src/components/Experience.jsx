import { useEffect, useState } from 'react'
import api from '../api'
import './Experience.css'

function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/experience')
      .then(r => setExperiences(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="experience">
      <div className="container">
        <p className="section-subtitle">Where I've worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-line" />
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        ) : experiences.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No experience added yet.</p>
        ) : (
          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={exp._id} className="timeline-item">
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
  )
}

export default Experience
