import { useProfile } from '../context/ProfileContext'
import './About.css'

function About() {
  const { profile } = useProfile()
  const skills = profile?.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML & CSS']

  return (
    <section id="about" className="about">
      <div className="container">
        <p className="section-subtitle">Who I am</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
        <div className="about-content">
          <div className="about-text">
            <p>{profile?.bio || ''}</p>
            <p>I care about writing clean, readable code and building experiences that feel natural and intuitive to use.</p>
            <div className="skills">
              <p>Technologies I work with</p>
              <ul className="skills-list">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">01</div>
              <div className="stat-label">Years of Learning</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Built</div>
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
