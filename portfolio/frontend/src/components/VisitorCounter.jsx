import { useEffect, useState } from 'react'
import api from '../api'
import './VisitorCounter.css'

function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      api.post('/api/visitors/increment')
        .then((res) => {
          setCount(res.data.count)
          sessionStorage.setItem('visited', 'true')
        })
        .catch(() => {})
    } else {
      api.get('/api/visitors')
        .then((res) => setCount(res.data.count))
        .catch(() => {})
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
