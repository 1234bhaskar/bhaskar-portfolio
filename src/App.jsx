import { motion } from 'framer-motion'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import ProjectScene from './components/ProjectScene.jsx'
import {
  ArrowUpRight,
  Sparkle,
  Pin,
  Briefcase,
  Github,
  LinkedIn,
  Mail,
  X,
} from './components/Icons.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.06,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const Card = ({ className = '', children, i = 0, ...rest }) => (
  <motion.div
    className={`card ${className}`}
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={i}
    whileHover={{ y: -3 }}
    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    {...rest}
  >
    {children}
  </motion.div>
)

function TopBar() {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">B</div>
        <div>
          <div className="brand-name">Bhaskar Chand</div>
          <div className="brand-sub">Backend Developer · India</div>
        </div>
      </div>
      <nav className="nav" aria-label="Primary">
        <a href="#work" className="active">Work</a>
        <a href="#stack">Stack</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="cta">
        <span className="dot" /> Available for work
      </button>
    </div>
  )
}

function IntroBlock() {
  return (
    <Card className="intro" i={0}>
      <div className="intro-canvas">
        <Scene3D />
      </div>

      <div className="intro-top">
        <span className="eyebrow accent">
          <span className="pip" /> Portfolio · 2026
        </span>
        <span className="eyebrow">
          <Pin /> Bengaluru, IN
        </span>
      </div>

      <div>
        <h1 className="intro-headline">
          <span className="accent">Hi, I'm a</span>
          <br />
          <span className="pop">Backend Developer</span>
          <br />
          <span className="accent">building scalable systems.</span>
        </h1>
        <p className="intro-sub">
          I design distributed services, event-driven pipelines, and clean APIs.
          Lately exploring agentic AI and the messy edges where backend meets
          intelligence.
        </p>
      </div>

      <div className="intro-meta">
        <span className="chip">
          <Briefcase /> 1+ yr SDE
        </span>
        <span className="chip">
          <Sparkle size={14} /> Microservices · Kafka · Redis
        </span>
        <span className="chip mono">JVM · Node · Python</span>
      </div>
    </Card>
  )
}

function ExperienceBlock() {
  return (
    <Card className="experience" i={1}>
      <div className="card-header">
        <span className="eyebrow"><span className="pip" /> Experience</span>
        <Briefcase size={16} />
      </div>
      <div className="exp-num">
        1<span className="plus">+</span>
        <span className="unit">year as SDE</span>
      </div>
      <p className="exp-desc">
        Shipping production microservices with a focus on horizontal scaling,
        resilient queues, and clean service boundaries.
      </p>
      <div className="exp-tags">
        <span className="tag">Microservices</span>
        <span className="tag">Horizontal scaling</span>
        <span className="tag">Distributed systems</span>
      </div>
    </Card>
  )
}

function AIBlock() {
  return (
    <Card className="ai" i={2}>
      <div className="ai-icon">
        <Sparkle size={22} />
      </div>
      <div className="ai-body">
        <h3>AI & Agents</h3>
        <p>
          Currently building with <strong>LangGraph</strong> and{' '}
          <strong>VoltAgent</strong>.
        </p>
      </div>
    </Card>
  )
}

const STACK = [
  { name: 'Java', role: 'JVM · Spring', mark: 'Jv' },
  { name: 'Python', role: 'AI · Tooling', mark: 'Py' },
  { name: 'Node.js', role: 'APIs · Realtime', mark: 'Nd' },
  { name: 'PHP', role: 'Laravel', mark: 'Ph' },
]

function StackBlock() {
  return (
    <Card className="stack" i={3}>
      <div className="card-header">
        <span className="eyebrow"><span className="pip" /> Core stack</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
          04
        </span>
      </div>
      <div className="stack-grid">
        {STACK.map((s, idx) => (
          <motion.div
            key={s.name}
            className="stack-item"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + idx * 0.05, duration: 0.4 }}
          >
            <div className="stack-icon">{s.mark}</div>
            <div>
              <div className="stack-name">{s.name}</div>
              <div className="stack-role">{s.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

function ProjectBlock({ index, variant, eyebrow, title, desc, tags }) {
  return (
    <Card className="project" i={index}>
      <div className="project-arrow">
        <ArrowUpRight size={14} />
      </div>
      <div className="project-thumb">
        <ProjectScene variant={variant} />
      </div>
      <span className="eyebrow accent" style={{ marginBottom: 8 }}>
        <span className="pip" /> {eyebrow}
      </span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="project-tags">
        {tags.map((t) => (
          <span key={t} className="tag mono">
            {t}
          </span>
        ))}
      </div>
    </Card>
  )
}

function PersonalBlock() {
  return (
    <Card className="personal" i={7}>
      <div className="personal-emoji">🇯🇵</div>
      <div className="personal-body">
        <h3>Currently learning Japanese</h3>
        <p>
          <span className="kana mono">ニホンゴ ベンキョウチュウ</span>
        </p>
      </div>
    </Card>
  )
}

function FooterCard() {
  return (
    <Card className="footer-card" i={8}>
      <div className="left">
        <span className="eyebrow"><span className="pip" /> Let's talk</span>
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>
          Open to backend & AI engineering roles.
        </span>
      </div>
      <div className="links">
        <a className="icon-btn" aria-label="GitHub" href="#">
          <Github />
        </a>
        <a className="icon-btn" aria-label="LinkedIn" href="#">
          <LinkedIn />
        </a>
        <a className="icon-btn" aria-label="X / Twitter" href="#">
          <X />
        </a>
        <a className="icon-btn" aria-label="Email" href="mailto:hi@example.com">
          <Mail />
        </a>
      </div>
    </Card>
  )
}

export default function App() {
  return (
    <div className="app">
      <div className="shell">
        <TopBar />

        <div className="bento">
          <IntroBlock />
          <ExperienceBlock />
          <AIBlock />
          <StackBlock />

          <ProjectBlock
            index={4}
            variant="link"
            eyebrow="Project · 01"
            title="URL Shortener"
            desc="A scalable shortener handling bursty traffic with async writes, Kafka events, and Redis-backed lookups."
            tags={['Spring Boot', 'Kafka', 'Redis']}
          />
          <ProjectBlock
            index={5}
            variant="search"
            eyebrow="Project · 02"
            title="Job Portal"
            desc="Full-text search with Elasticsearch over thousands of postings, resumes streamed to AWS S3."
            tags={['Elasticsearch', 'AWS S3', 'Node.js']}
          />
          <ProjectBlock
            index={6}
            variant="hotel"
            eyebrow="Project · 03"
            title="Hotel Onboarding API"
            desc="Laravel REST service that streamlines property onboarding, validation, and document workflows."
            tags={['Laravel', 'PHP', 'MySQL']}
          />

          <PersonalBlock />
          <FooterCard />
        </div>
      </div>
    </div>
  )
}
