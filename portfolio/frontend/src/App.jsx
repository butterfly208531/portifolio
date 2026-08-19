import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'

import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin route */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Full pages */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* Public portfolio (home) */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Sidebar />
            <div className="main-content">
              <Hero />
              <About />
              <Projects />
              <Services />
              <Contact />
              <Footer />
            </div>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
