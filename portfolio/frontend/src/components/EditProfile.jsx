import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import './EditProfile.css'

function EditProfile({ onClose }) {
  const { profile, updateProfile } = useProfile()
  const [form, setForm] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    bio: profile?.bio || '',
    skills: profile?.skills?.join(', ') || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || '',
    email: profile?.email || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await updateProfile({
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 1000)
  }

  return (
    <div className="ep-overlay" onClick={onClose}>
      <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ep-header">
          <h2>Edit Profile</h2>
          <button className="ep-close" onClick={onClose}>✕</button>
        </div>
        <form className="ep-form" onSubmit={handleSubmit}>
          <div className="ep-row">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="ep-row">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div className="ep-row">
            <label>Bio</label>
            <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} />
          </div>
          <div className="ep-row">
            <label>Skills <span>(comma separated)</span></label>
            <input name="skills" value={form.skills} onChange={handleChange} />
          </div>
          <div className="ep-row">
            <label>GitHub URL</label>
            <input name="github" value={form.github} onChange={handleChange} />
          </div>
          <div className="ep-row">
            <label>LinkedIn URL</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} />
          </div>
          <div className="ep-row">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="ep-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
