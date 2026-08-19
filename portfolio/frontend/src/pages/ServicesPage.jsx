import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { SERVICES } from '../data'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PageShared.css'
import '../components/Services.css'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const headerRef = useReveal()
  const contentRef = useReveal()

  useEffect(() => {
    api.get('/api/services')
      .then(r => setServices(r.data.length ? r.data : SERVICES))
      .catch(() => setServices(SERVICES))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="main-content">
        <section className="page-header">
          <div className="container" ref={headerRef} data-reveal="fade-up">
            <Link to="/" className="back-link"><i className="fa fa-arrow-left" /> Back to Home</Link>
            <p className="section-subtitle">What I offer</p>
            <h1 className="page-title">Services</h1>
            <div className="section-line" />
          </div>
        </section>

        <section className="page-body">
          <div className="container" ref={contentRef} data-reveal="fade-up">
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            ) : (
              <div className="services-grid">
                {services.map((s, i) => (
                  <div key={s._id || i} className="service-card" style={{animationDelay: `${i * 0.06}s`}}>
                    <div className="service-icon">
                      <i className={`fa ${s.icon}`} />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    {s.details && <p className="service-detail">{s.details}</p>}
                    <div className="service-number">{String(i + 1).padStart(2, '0')}</div>
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

export default ServicesPage
