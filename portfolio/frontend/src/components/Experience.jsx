import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { STUDENT_EXPERIENCE } from '../data'
import api from '../api'
import './Experience.css'

function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useReveal()

  useEffect(() => {
    api.get('/api/experience')
      .then(r => setExperiences(r.data.length ? r.data : STUDENT_EXPERIENCE))
      .catch(() => setExperiences(STUDENT_EXPERIENCE))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="experience">
      <div className="container" ref={sectionRef} data-reveal="fade-up">
        <p className="section-subtitle">Where I've worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-line" />
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        ) : (
          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={exp._id} className="timeline-item" style={{animationDelay: `${i * 0.08}s`}}>
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
        <div className="section-cta">
          <Link to="/experience" className="btn">View Full Journey <i className="fa fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

export default Experience
