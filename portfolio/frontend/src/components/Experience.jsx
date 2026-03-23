import './Experience.css'

const experiences = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Your Company',
    duration: '2024 — Present',
    type: 'Full-time',
    achievements: [
      'Built and maintained full-stack web applications using the MERN stack',
      'Collaborated with design team to implement responsive UI components',
      'Improved application performance by optimizing database queries',
    ],
  },
  {
    id: 2,
    title: 'Junior Developer',
    company: 'Previous Company',
    duration: '2023 — 2024',
    type: 'Internship',
    achievements: [
      'Developed RESTful APIs with Node.js and Express',
      'Worked on React frontend features and bug fixes',
      'Participated in code reviews and agile sprints',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <p className="section-subtitle">Where I've worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-line" />
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="timeline-item">
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
                  {exp.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
