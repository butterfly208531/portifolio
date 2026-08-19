import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { DEMO_PROJECTS } from '../data'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PageShared.css'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const headerRef = useReveal()

  useEffect(() => {
    api.get('/api/projects')
      .then((res) => setProjects(res.data.length ? res.data : DEMO_PROJECTS))
      .catch(() => setProjects(DEMO_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="main-content">
        <section className="page-header">
          <div className="container" ref={headerRef} data-reveal="fade-up">
            <Link to="/" className="back-link"><i className="fa fa-arrow-left" /> Back to Home</Link>
            <p className="section-subtitle">What I've built</p>
            <h1 className="page-title">All Projects</h1>
            <div className="section-line" />
          </div>
        </section>

        <section className="page-body">
          <div className="container">
            {loading ? (
              <div className="projects-grid">
                {[1,2,3].map(i => (
                  <div key={i} className="project-card">
                    <div className="skeleton" style={{ width: 60, height: 40, marginBottom: 16 }} />
                    <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 12 }} />
                    <div className="skeleton" style={{ width: '90%', height: 14, marginBottom: 8 }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="projects-grid">
                {projects.map((project, i) => (
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

export default ProjectsPage
