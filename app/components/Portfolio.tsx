'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Mail, Github, Linkedin, Send, Code, Server, Cpu } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import { useTheme } from "next-themes"
import TurnstileWidget from './TurnstileWidget'
import Loading from './Loading'
import { sendEmail } from '../actions/sendEmail'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) {
      setNotification({ type: 'error', message: 'Please complete the CAPTCHA' })
      return
    }
    setLoading(true)
    try {
      await sendEmail({ ...formData, turnstileToken })
      setNotification({ type: 'success', message: 'Message sent successfully!' })
      setFormData({ name: '', email: '', message: '' })
      setTurnstileToken(null)
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to send message. Please try again.' })
    }
    setLoading(false)
    setTimeout(() => setNotification(null), 1500)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="p-4 flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Ryan Shelby
        </motion.h1>
        <div className="flex items-center space-x-4">
          <Switch checked={theme === 'dark'} onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Web Developer | Hacker | Mechanical Engineer</h2>
          <p className="text-xl text-muted-foreground">Bridging the gap between software and hardware</p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {[
            { title: 'Web Development', icon: Code, description: 'Building responsive and dynamic web applications using modern frameworks and technologies.' },
            { title: 'Cybersecurity', icon: Server, description: 'Implementing robust security measures and conducting penetration testing to protect digital assets.' },
            { title: 'Mechanical Engineering', icon: Cpu, description: 'Designing and optimizing mechanical systems with a focus on efficiency and innovation.' }
          ].map(({ title, icon: Icon, description }, index) => (
            <motion.div 
              key={title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-card rounded-lg shadow-lg"
            >
              <Icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Secure Chat App', description: 'End-to-end encrypted messaging application built with React and Node.js.' },
              { title: 'IoT Home Automation', description: 'Smart home system integrating various sensors and actuators using Raspberry Pi.' },
              { title: 'Blockchain Voting System', description: 'Decentralized voting platform ensuring transparency and security in elections.' },
              { title: 'AI-powered Drone', description: 'Autonomous drone with computer vision capabilities for search and rescue operations.' }
            ].map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button variant="outline" asChild>
              <a href="mailto:rynexx@tuta.io" target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-4 w-4" /> rynexx@tuta.io
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/rynex" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> rynex
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/rynex" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> rynex
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://t.me/leesiwoo_s" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" /> leesiwoo_s
              </a>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              type="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Textarea 
              placeholder="Your Message" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <TurnstileWidget onVerify={setTurnstileToken} />
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </motion.section>
      </main>

      <footer className="text-center p-4 text-muted-foreground">
        © 2023 Ryan Shelby. All rights reserved.
      </footer>

      <AnimatePresence>
        {loading && <Loading />}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Alert variant={notification.type === 'success' ? 'default' : 'destructive'}>
              <AlertTitle>{notification.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}