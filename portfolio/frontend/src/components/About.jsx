import { useProfile } from '../context/ProfileContext'
import './About.css'

function About() {
  const { profile, loading } = useProfile()
  const skills = profile?.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML & CSS', 'Git', 'REST APIs']

  if (loading) {
    return (
      <section id="about" className="about">
        <div className="container">
          <div className="skeleton" style={{ width: 80, height: 12, marginBottom: 12 }} />
          <div className="skeleton" style={{ width: 200, height: 36, marginBottom: 16 }} />
          <div className="skeleton" style={{ width: 40, height: 1, marginBottom: 48 }} />
          <div className="about-content">
            <div>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 14, marginBottom: 12, width: `${90 - i * 10}%` }} />)}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="about">
      <div className="container">
        <p className="section-subtitle">Who I am</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
        <div className="about-content">
          <div className="about-text">
            <p>{profile?.bio || 'I\'m a passionate full stack developer who loves building clean, user-friendly web applications. I enjoy turning complex problems into simple, beautiful solutions.'}</p>
            <p>I care about writing clean, readable code and building experiences that feel natural and intuitive to use.</p>
            <div className="about-meta">
              <div className="meta-item">
                <i className="fa fa-map-marker-alt" />
                <span>{profile?.location || 'Addis Ababa, Ethiopia'}</span>
              </div>
              <div className="meta-item">
                <i className="fa fa-clock" />
                <span>EAT (UTC+3)</span>
              </div>
              <div className="meta-item">
                <i className="fa fa-envelope" />
                <span>{profile?.email || 'seblemen94@gmail.com'}</span>
              </div>
            </div>
            <div className="skills">
              <p className="skills-label">Technologies</p>
              <ul className="skills-list">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">1+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Passion for Code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
