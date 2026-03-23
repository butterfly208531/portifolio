import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Login from '../components/Login'
import './AdminPage.css'

function AdminPage() {
  const { auth, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [tab, setTab] = useState('projects')

  // Profile state
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({})
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')

  // Projects state
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' })
  const [projectMsg, setProjectMsg] = useState('')

  // Messages state
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!isAdmin) return
    fetchProfile()
    fetchProjects()
    fetchMessages()
  }, [isAdmin])

  const fetchProfile = () => {
    api.get('/api/profile').then(r => {
      setProfile(r.data)
      setProfileForm({
        name: r.data.name || '',
        title: r.data.title || '',
        bio: r.data.bio || '',
        skills: (r.data.skills || []).join(', '),
        github: r.data.github || '',
        linkedin: r.data.linkedin || '',
        email: r.data.email || '',
      })
    })
  }

  const fetchProjects = () => {
    api.get('/api/projects').then(r => setProjects(r.data))
  }

  const fetchMessages = () => {
    api.get('/api/contact', {
      headers: { Authorization: `Bearer ${auth?.token}` }
    }).then(r => setMessages(r.data)).catch(() => {})
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setProfileSaving(true)
    try {
      await api.put('/api/profile',
        { ...profileForm, skills: profileForm.skills.split(',').map(s => s.trim()).filter(Boolean) },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      )
      setProfileMsg('Saved!')
      setTimeout(() => setProfileMsg(''), 2000)
    } catch { setProfileMsg('Error saving') }
    setProfileSaving(false)
  }

  const addProject = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/projects',
        { ...newProject, technologies: newProject.technologies.split(',').map(s => s.trim()).filter(Boolean) },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      )
      setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' })
      setProjectMsg('Project added!')
      setTimeout(() => setProjectMsg(''), 2000)
      fetchProjects()
    } catch { setProjectMsg('Error adding project') }
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    await api.delete(`/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${auth?.token}` }
    })
    fetchProjects()
  }

  if (!isAdmin) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-box">
          <p className="admin-gate-label">Admin Access Only</p>
          <h1>Portfolio Admin</h1>
          <p>Sign in to manage your portfolio.</p>
          <button className="btn btn-primary" onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </div>
    )
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">SM Admin</div>
        <nav className="admin-nav">
          {['projects', 'profile', 'messages'].map(t => (
            <button key={t} className={`admin-nav-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              <i className={`fa ${t === 'projects' ? 'fa-code' : t === 'profile' ? 'fa-user' : 'fa-envelope'}`} />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-view-site" target="_blank" rel="noreferrer">
            <i className="fa fa-external-link-alt" /> View Site
          </a>
          <button className="admin-logout" onClick={logout}>
            <i className="fa fa-sign-out-alt" /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h2 className="admin-title">
            {tab === 'projects' ? 'Projects' : tab === 'profile' ? 'Profile' : 'Messages'}
          </h2>
          <span className="admin-user">👋 {auth?.username}</span>
        </div>

        {/* PROJECTS TAB */}
        {tab === 'projects' && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Add New Project</h3>
              <form className="admin-form" onSubmit={addProject}>
                <div className="admin-form-row">
                  <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                  <input placeholder="Technologies (comma separated)" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} />
                </div>
                <textarea placeholder="Description" rows="3" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                <div className="admin-form-row">
                  <input placeholder="GitHub URL" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
                  <input placeholder="Live URL" value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} />
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">Add Project</button>
                  {projectMsg && <span className="admin-msg">{projectMsg}</span>}
                </div>
              </form>
            </div>

            <div className="admin-card">
              <h3>All Projects ({projects.length})</h3>
              <div className="admin-projects-list">
                {projects.map(p => (
                  <div key={p._id} className="admin-project-item">
                    <div>
                      <p className="admin-project-title">{p.title}</p>
                      <p className="admin-project-tech">{p.technologies?.join(', ')}</p>
                    </div>
                    <button className="admin-delete-btn" onClick={() => deleteProject(p._id)}>
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                ))}
                {projects.length === 0 && <p className="admin-empty">No projects yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Edit Profile</h3>
              <form className="admin-form" onSubmit={saveProfile}>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Name</label>
                    <input value={profileForm.name || ''} onChange={e => setProfileForm({...profileForm, name: e.target.value})} />
                  </div>
                  <div className="admin-field">
                    <label>Title</label>
                    <input value={profileForm.title || ''} onChange={e => setProfileForm({...profileForm, title: e.target.value})} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Bio</label>
                  <textarea rows="4" value={profileForm.bio || ''} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Skills (comma separated)</label>
                  <input value={profileForm.skills || ''} onChange={e => setProfileForm({...profileForm, skills: e.target.value})} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>GitHub URL</label>
                    <input value={profileForm.github || ''} onChange={e => setProfileForm({...profileForm, github: e.target.value})} />
                  </div>
                  <div className="admin-field">
                    <label>LinkedIn URL</label>
                    <input value={profileForm.linkedin || ''} onChange={e => setProfileForm({...profileForm, linkedin: e.target.value})} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Email</label>
                  <input type="email" value={profileForm.email || ''} onChange={e => setProfileForm({...profileForm, email: e.target.value})} />
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary" disabled={profileSaving}>
                    {profileSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  {profileMsg && <span className="admin-msg">{profileMsg}</span>}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === 'messages' && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Contact Messages ({messages.length})</h3>
              <div className="admin-messages-list">
                {messages.map(m => (
                  <div key={m._id} className="admin-message-item">
                    <div className="admin-message-header">
                      <span className="admin-message-name">{m.name}</span>
                      <span className="admin-message-email">{m.email}</span>
                      <span className="admin-message-date">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="admin-message-body">{m.message}</p>
                  </div>
                ))}
                {messages.length === 0 && <p className="admin-empty">No messages yet.</p>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminPage
