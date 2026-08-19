import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { SERVICES } from '../data'
import api from '../api'
import './Services.css'

function Services() {
  const [services, setServices] = useState([])
  const sectionRef = useReveal()

  useEffect(() => {
    api.get('/api/services')
      .then(r => setServices(r.data.length ? r.data : SERVICES))
      .catch(() => setServices(SERVICES))
  }, [])

  return (
    <section id="services" className="services">
      <div className="container" ref={sectionRef} data-reveal="fade-up">
        <p className="section-subtitle">What I offer</p>
        <h2 className="section-title">Services</h2>
        <div className="section-line" />
        <div className="services-grid">
          {services.slice(0, 3).map((s, i) => (
            <div key={s._id || i} className="service-card" style={{animationDelay: `${i * 0.06}s`}}>
              <div className="service-icon">
                <i className={`fa ${s.icon}`} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="service-number">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/services" className="btn">View All Services <i className="fa fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

export default Services
