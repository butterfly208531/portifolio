import { useEffect, useState } from 'react'
import api from '../api'
import './VisitorCounter.css'

function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    api.get('/api/visitors')
      .then((res) => setCount(res.data.count))
      .catch(() => {})

    if (!sessionStorage.getItem('viewed')) {
      const visitorId = sessionStorage.getItem('visitorId') || crypto.randomUUID()
      sessionStorage.setItem('visitorId', visitorId)
      sessionStorage.setItem('viewed', 'true')
      api.post('/api/views', { visitorId }).catch(() => {})
    }
  }, [])

  if (count === null) return null

  return (
    <div className='visitor-counter'>
      <span className='visitor-dot' />
      {count.toLocaleString()} {count === 1 ? 'visitor' : 'visitors'}
    </div>
  )
}

export default VisitorCounter
