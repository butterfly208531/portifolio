import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { SERVICES } from '../data'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PageShared.css'
import '../components/Services.css'

function ServicesPage() {
  const headerRef = useReveal()
  const contentRef = useReveal()

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
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="service-card" style={{animationDelay: `${i * 0.06}s`}}>
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
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default ServicesPage
