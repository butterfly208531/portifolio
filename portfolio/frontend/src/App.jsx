import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin route — completely separate, no navbar/sidebar */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Public portfolio */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Sidebar />
            <div className="main-content">
              <Hero />
              <About />
              <Projects />
              <Experience />
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
