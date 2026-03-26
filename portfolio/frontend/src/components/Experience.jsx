import { useEffect, useState } from 'react'
import api from '../api'
import './Experience.css'

const STUDENT_EXPERIENCE = [
  {
    _id: 'exp1',
    title: 'Kindergarten',
    company: 'Early Education',
    duration: 'Early Years',
    type: 'Education',
    achievements: [
      'Learned to play, share, and write letters in Amharic and English.',
    ],
  },
  {
    _id: 'exp2',
    title: 'Class 1 — Formal School Entry',
    company: 'Primary School',
    duration: '2010',
    type: 'Education',
    achievements: [
      'Entered formal primary school. Started learning with textbooks, notebooks, and homework.',
    ],
  },
  {
    _id: 'exp3',
    title: 'Primary School (Grades 1–8)',
    company: 'Primary School',
    duration: '2010 – 2015',
    type: 'Education',
    achievements: [
      'Completed 8 years of primary education.',
      'Took the Grade 8 national exit exam to qualify for secondary school.',
    ],
  },
  {
    _id: 'exp4',
    title: 'Secondary School (Grades 9–10)',
    company: 'Secondary School',
    duration: '2016 – 2018',
    type: 'Education',
    achievements: [
      'Studied general subjects across core disciplines.',
      'Did not take the Grade 10 national exam due to circumstances.',
    ],
  },
  {
    _id: 'exp5',
    title: 'Preparatory School (Grades 11–12)',
    company: 'Preparatory School',
    duration: '2019 – 2021',
    type: 'Education',
    achievements: [
      'Continued to preparatory school and chose the Natural Science stream.',
      'Prepared for the Ethiopian University Entrance Examination (EUEE).',
      'COVID-19 disrupted classes and exams during this period.',
    ],
  },
  {
    _id: 'exp6',
    title: 'University Entrance',
    company: 'EUEE — Ethiopian University Entrance Examination',
    duration: '2022',
    type: 'Education',
    achievements: [
      'Took the EUEE national university entrance exam.',
      'Did not score high enough for regular placement.',
      'Entered university through the remedial program.',
    ],
  },
  {
    _id: 'exp7',
    title: 'Information Technology Student',
    company: 'Wollo University',
    duration: '2022 – Present',
    type: 'University',
    achievements: [
      'Currently studying Information Technology at Wollo University.',
      'Building full-stack web applications using the MERN stack.',
      'Developing desktop apps with C# WinForms and .NET.',
      'Practicing Python, Java, C++, and Android development through personal projects.',
      'Built and deployed a personal portfolio with admin dashboard and project showcase.',
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
