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

  // Experience state
  const [experiences, setExperiences] = useState([])
  const [newExp, setNewExp] = useState({ title: '', company: '', duration: '', type: 'Full-time', achievements: '' })
  const [expMsg, setExpMsg] = useState('')

  // Messages state
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!isAdmin) return
    fetchProfile()
    fetchProjects()
    fetchMessages()
    fetchExperiences()
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
        avatar: r.data.avatar || '',
        yearsExperience: r.data.yearsExperience ?? 1,
        telegram: r.data.telegram || '',
        instagram: r.data.instagram || '',
      })
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setProfileForm(prev => ({ ...prev, avatar: reader.result }))
    reader.readAsDataURL(file)
  }

  const fetchProjects = () => {
    api.get('/api/projects').then(r => setProjects(r.data))
  }

  const fetchMessages = () => {
    api.get('/api/contact', {
      headers: { Authorization: `Bearer ${auth?.token}` }
    }).then(r => setMessages(r.data)).catch(() => {})
  }

  const fetchExperiences = () => {
    api.get('/api/experience').then(r => setExperiences(r.data)).catch(() => {})
  }

  const addExperience = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/experience',
        { ...newExp, achievements: newExp.achievements.split('\n').map(s => s.trim()).filter(Boolean) },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      )
      setNewExp({ title: '', company: '', duration: '', type: 'Full-time', achievements: '' })
      setExpMsg('Added!')
      setTimeout(() => setExpMsg(''), 2000)
      fetchExperiences()
    } catch { setExpMsg('Error adding') }
  }

  const deleteExperience = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    await api.delete(`/api/experience/${id}`, {
      headers: { Authorization: `Bearer ${auth?.token}` }
    })
    fetchExperiences()
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
          {['projects', 'experience', 'profile', 'messages'].map(t => (
            <button key={t} className={`admin-nav-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              <i className={`fa ${t === 'projects' ? 'fa-code' : t === 'experience' ? 'fa-briefcase' : t === 'profile' ? 'fa-user' : 'fa-envelope'}`} />
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
            {tab === 'projects' ? 'Projects' : tab === 'experience' ? 'Experience' : tab === 'profile' ? 'Profile' : 'Messages'}
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

        {/* EXPERIENCE TAB */}
        {tab === 'experience' && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Add Experience</h3>
              <form className="admin-form" onSubmit={addExperience}>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Job Title</label>
                    <input placeholder="e.g. Full Stack Developer" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} required />
                  </div>
                  <div className="admin-field">
                    <label>Company</label>
                    <input placeholder="e.g. Acme Inc." value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} required />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Duration</label>
                    <input placeholder="e.g. 2023 — Present" value={newExp.duration} onChange={e => setNewExp({...newExp, duration: e.target.value})} required />
                  </div>
                  <div className="admin-field">
                    <label>Type</label>
                    <input placeholder="e.g. Full-time, Internship" value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Achievements (one per line)</label>
                  <textarea rows="4" placeholder="Built REST APIs with Node.js&#10;Worked on React features" value={newExp.achievements} onChange={e => setNewExp({...newExp, achievements: e.target.value})} />
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">Add Experience</button>
                  {expMsg && <span className="admin-msg">{expMsg}</span>}
                </div>
              </form>
            </div>
            <div className="admin-card">
              <h3>All Experience ({experiences.length})</h3>
              <div className="admin-projects-list">
                {experiences.map(exp => (
                  <div key={exp._id} className="admin-project-item">
                    <div>
                      <p className="admin-project-title">{exp.title} — {exp.company}</p>
                      <p className="admin-project-tech">{exp.duration} · {exp.type}</p>
                    </div>
                    <button className="admin-delete-btn" onClick={() => deleteExperience(exp._id)}>
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                ))}
                {experiences.length === 0 && <p className="admin-empty">No experience added yet.</p>}
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
                <div className="admin-field">
                  <label>Profile Picture</label>
                  <div className="admin-avatar-preview">
                    {profileForm.avatar
                      ? <img src={profileForm.avatar} alt="avatar" />
                      : <div className="admin-avatar-placeholder"><i className="fa fa-user" /></div>
                    }
                  </div>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
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
                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Telegram URL</label>
                    <input placeholder="https://t.me/username" value={profileForm.telegram || ''} onChange={e => setProfileForm({...profileForm, telegram: e.target.value})} />
                  </div>
                  <div className="admin-field">
                    <label>Instagram URL</label>
                    <input placeholder="https://instagram.com/username" value={profileForm.instagram || ''} onChange={e => setProfileForm({...profileForm, instagram: e.target.value})} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Email</label>
                  <input type="email" value={profileForm.email || ''} onChange={e => setProfileForm({...profileForm, email: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Years of Experience</label>
                  <input type="number" min="0" value={profileForm.yearsExperience ?? 1} onChange={e => setProfileForm({...profileForm, yearsExperience: Number(e.target.value)})} />
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
