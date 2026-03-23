import { useEffect, useState } from 'react'
import api from '../api'
import './Projects.css'

const DEMO_PROJECTS = [
  {
    _id: 'demo1',
    title: 'Portfolio Website',
    description: 'A full-stack personal portfolio built with the MERN stack, featuring dark/light mode, visitor counter, and editable profile.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/butterfly208531/portifolio',
    liveUrl: '#',
  },
  {
    _id: 'demo2',
    title: 'Project Two',
    description: 'Add your project description here. Showcase what you built, the problem it solves, and the impact it had.',
    technologies: ['React', 'Firebase', 'Tailwind'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    _id: 'demo3',
    title: 'Project Three',
    description: 'Another great project. Describe the tech stack, your role, and any interesting challenges you solved.',
    technologies: ['Next.js', 'PostgreSQL', 'TypeScript'],
    githubUrl: '#',
    liveUrl: '#',
  },
]

function ProjectSkeleton() {
  return (
    <div className="project-card">
      <div className="skeleton" style={{ width: 60, height: 40, marginBottom: 16 }} />
      <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '90%', height: 14, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '80%', height: 14, marginBottom: 20 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ width: 60, height: 24 }} />)}
      </div>
    </div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/projects')
      .then((res) => setProjects(res.data.length ? res.data : DEMO_PROJECTS))
      .catch(() => setProjects(DEMO_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="section-subtitle">What I've built</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
        <div className="projects-grid">
          {loading
            ? [1, 2, 3].map(i => <ProjectSkeleton key={i} />)
            : projects.map((project, i) => (
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
      </div>
    </section>
  )
}

export default Projects
