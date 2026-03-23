import './Services.css'

const services = [
  {
    icon: 'fa-code',
    title: 'Web Development',
    description: 'Full-stack web applications built with React, Node.js, and MongoDB. Clean code, fast performance, and scalable architecture.',
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Responsive Design',
    description: 'Mobile-first designs that look and work great on every device — from phones to large desktop screens.',
  },
  {
    icon: 'fa-server',
    title: 'Backend & APIs',
    description: 'RESTful API design and development with Express.js. Database modeling, authentication, and server-side logic.',
  },
  {
    icon: 'fa-paint-brush',
    title: 'UI/UX Design',
    description: 'Clean, minimalist interfaces focused on usability. Turning wireframes and ideas into polished, accessible products.',
  },
]

function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <p className="section-subtitle">What I offer</p>
        <h2 className="section-title">Services</h2>
        <div className="section-line" />
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">
                <i className={`fa ${s.icon}`} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="service-number">0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
