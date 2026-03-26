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
  {
    icon: 'fa-laptop-code',
    title: 'C++ Development',
    description: 'High-performance desktop and system applications using C++. Memory management, OOP, and efficient algorithms.',
  },
  {
    icon: 'fa-coffee',
    title: 'Java Development',
    description: 'Cross-platform applications and backend services built with Java. Spring Boot, OOP design patterns, and enterprise solutions.',
  },
  {
    icon: 'fa-windows',
    title: 'C# / .NET Development',
    description: 'Windows desktop apps with WinForms and WPF, plus .NET backend services. Clean architecture and modern C# practices.',
  },
  {
    icon: 'fa-python',
    title: 'Python Development',
    description: 'Scripting, automation, data processing, and backend APIs with Python. Flask, Django, and data science libraries.',
  },
  {
    icon: 'fa-android',
    title: 'Android Development',
    description: 'Native Android applications built with Java/Kotlin. Intuitive UI, device API integration, and Play Store deployment.',
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
              <div className="service-number">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
