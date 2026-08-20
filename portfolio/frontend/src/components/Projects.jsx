import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { DEMO_PROJECTS } from '../data'
import api from '../api'
import './Projects.css'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useReveal()

  useEffect(() => {
    api.get('/api/github/repos')
      .then((res) => setProjects(res.data.length ? res.data : DEMO_PROJECTS))
      .catch(() => setProjects(DEMO_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container" ref={sectionRef} data-reveal="fade-up">
        <p className="section-subtitle">What I've built</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
        <div className="projects-grid">
          {loading
            ? [1, 2, 3].map(i => (
              <div key={i} className="project-card">
                <div className="skeleton" style={{ width: 60, height: 40, marginBottom: 16 }} />
                <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 12 }} />
                <div className="skeleton" style={{ width: '90%', height: 14, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '80%', height: 14, marginBottom: 20 }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1,2,3].map(j => <div key={j} className="skeleton" style={{ width: 60, height: 24 }} />)}
                </div>
              </div>
            ))
            : projects.slice(0, 3).map((project, i) => (
              <div key={project._id} className="project-card" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="project-number">0{i + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <i className="fab fa-github" /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <i className="fa fa-external-link-alt" /> Live
                    </a>
                  )}
                </div>
              </div>
            ))
          }
        </div>
        <div className="section-cta">
          <Link to="/projects" className="btn">View All Projects <i className="fa fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
