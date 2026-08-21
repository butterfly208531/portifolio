import { useState, useRef } from 'react'
import useReveal from '../hooks/useReveal'
import emailjs from '@emailjs/browser'
import './Contact.css'

const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const sectionRef = useReveal()
  const formRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container" ref={sectionRef} data-reveal="fade-up">
        <p className="section-subtitle">Get in touch</p>
        <h2 className="section-title">Contact Me</h2>
        <div className="section-line" />
        <p className="contact-desc">
          Have a question or want to work together? I'd love to hear from you.
        </p>
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="msg success">Message sent successfully!</p>}
          {status === 'error' && <p className="msg error">Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact
