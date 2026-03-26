import { useEffect, useState } from 'react'
import api from '../api'
import './Experience.css'

const STUDENT_EXPERIENCE = [
  {
    _id: 'student1',
    title: 'Full Stack Developer Student',
    company: 'Self-Learning & Personal Projects',
    duration: '2023 — Present',
    type: 'Student',
    achievements: [
      'Building full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js).',
      'Developed desktop applications with C# WinForms and .NET.',
      'Practicing Python, Java, C++, and Android development through personal projects.',
      'Continuously learning modern web technologies, clean code principles, and software design patterns.',
      'Built and deployed a personal portfolio website with admin dashboard, visitor counter, and project showcase.',
    ],
  },
]

function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/experience')
      .then(r => setExperiences(r.data.length ? r.data : STUDENT_EXPERIENCE))
      .catch(() => setExperiences(STUDENT_EXPERIENCE))
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
