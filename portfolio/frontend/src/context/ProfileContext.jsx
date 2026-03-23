import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/profile')
      .then((res) => setProfile(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const updateProfile = async (data) => {
    const res = await api.put('/api/profile', data)
    setProfile(res.data)
  }

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
