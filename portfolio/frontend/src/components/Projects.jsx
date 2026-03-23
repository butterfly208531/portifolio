import { useEffect, useState } from 'react'
import api from '../api'
import './Projects.css'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="section-subtitle">What I've built</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
        {loading ? (
          <p className="loading">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="no-projects">No projects yet. Add some via the API.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={project._id} className="project-card">
                <div className="project-number">0{i + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
