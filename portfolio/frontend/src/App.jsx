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

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Services />
              <Contact />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
