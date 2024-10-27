'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Mail, Github, Linkedin, Send, Code, Server, Cpu, MessageSquare, Gitlab, BookOpen, ChevronDown, Paintbrush, GitBranch, Brain, Link, Wifi, Smartphone, BarChart, Users } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import { useTheme } from "next-themes"
import TurnstileWidget from './TurnstileWidget'
import Loading from './Loading'
import { sendEmail } from '../actions/sendEmail'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Progress } from "../components/ui/progress"

const useVisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('/api/visit-count', { method: 'POST' });
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Failed to fetch visit count:', error);
      }
    };

    fetchVisitCount();
  }, []);

  return count;
};

function VisitCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
      <Users className="w-4 h-4" />
      <span className="text-sm font-medium">{count} visits</span>
    </div>
  )
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const visitCount = useVisitCounter()

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
    setTimeout(() => setNotification(null), 2500)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="p-4 flex justify-between items-center sticky top-0 bg-background z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Ryan Shelby
        </motion.h1>
        <div className="flex items-center space-x-4">
          <VisitCounter count={visitCount} />
          <Switch checked={theme === 'dark'} onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Hero />
        <Skills />
        <Projects />
        <Contact handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} loading={loading} setTurnstileToken={setTurnstileToken} />
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

function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center mb-20 py-20"
    >
      <h2 className="text-5xl font-bold mb-6">Ryan Shelby</h2>
      <h3 className="text-3xl font-semibold mb-4">Web Developer | Ethical Hacker | Mechanical Engineer</h3>
      <p className="text-xl text-muted-foreground mb-8">Bridging the gap between software and hardware</p>
      <Button size="lg" asChild>
        <a href="#contact">Get in Touch</a>
      </Button>
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-12"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </motion.section>
  )
}

function Skills() {
  const skills = [
    { name: 'Web Development', icon: Code, level: 90 },
    { name: 'Cybersecurity', icon: Server, level: 85 },
    { name: 'Mechanical Engineering', icon: Cpu, level: 80 },
    { name: 'UI/UX Design', icon: Paintbrush, level: 80 },
    { name: 'DevOps', icon: GitBranch, level: 70 },
    { name: 'Machine Learning', icon: Brain, level: 65 },
    { name: 'Blockchain', icon: Link, level: 70 },
    { name: 'IoT', icon: Wifi, level: 75 },
    { name: 'Mobile App Development', icon: Smartphone, level: 70 },
    { name: 'Data Analysis', icon: BarChart, level: 80 },
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(({ name, icon: Icon, level }, index) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="border-2 border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon className="w-6 h-6 mr-2" />
                  {name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={level} className="w-full" />
                <span className="text-sm text-muted-foreground mt-2">{level}% Proficiency</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function Projects() {
  const projects = [
    { title: 'Secure Chat App', description: 'End-to-end encrypted messaging application built with React and Node.js.' },
    { title: 'IoT Home Automation', description: 'Smart home system integrating various sensors and actuators using Raspberry Pi.' },
    { title: 'Blockchain Voting System', description: 'Decentralized voting platform ensuring transparency and security in elections.' },
    { title: 'AI-powered Drone', description: 'Autonomous drone with computer vision capabilities for search and rescue operations.' }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="border-2 border-secondary/20 hover:border-secondary transition-colors duration-300">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function Contact({ handleSubmit, formData, setFormData, loading, setTurnstileToken }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="mb-20"
      id="contact"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>Send me a message directly</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Connect With Me</CardTitle>
            <CardDescription>Find me on various platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <SocialLink href="mailto:rynexx@tuta.io" icon={Mail} label="Email" />
              <SocialLink href="https://github.com/rynex" icon={Github} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/rynex" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://t.me/leesiwoo_s" icon={Send} label="Telegram" />
              <SocialLink href="https://reddit.com/user/leesiwoo_s" icon={MessageSquare} label="Reddit" />
              <SocialLink href="https://gitlab.com/rynex" icon={Gitlab} label="GitLab" />
              <SocialLink href="https://medium.com/@layek" icon={BookOpen} label="Medium" />
              <SocialLink href="#" icon={Code} label="Portfolio" />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  className?: string;
}

function SocialLink({ href, icon: Icon, label, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors ${className}`}
    >
      <Icon className="w-6 h-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}