import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  Trophy,
} from 'lucide-react';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Full Stack Developer', 'AI Enthusiast'];

const aboutCards = [
  'I am Vivek K K, a Computer Science Engineering (AI & ML) student at Sri Eshwar College of Engineering with a CGPA of 8.07.',
  'I am passionate about Full Stack Development, Artificial Intelligence, UI/UX Design, and building products that solve real-world problems.',
  'I enjoy transforming ideas into scalable applications and continuously learning new technologies through projects, hackathons, internships, and coding challenges.',
];

const internships = [
  { company: 'CELLSTRAT', role: 'AI Internship', date: 'Jun 2025 - Jul 2025' },
  { company: 'SYNAPSLOGIC', role: 'Full Stack Development Internship', date: 'Aug 2025 - Sep 2025' },
  { company: 'NIELIT, Calicut', role: 'Data Analytics, AI & Web Development Internship', date: 'Dec 2025' },
];

const skillGroups = [
  { title: 'Programming', skills: ['C', 'C++', 'Python', 'JavaScript', 'Java'] },
  { title: 'Frontend', skills: ['HTML', 'CSS', 'React', 'Tailwind CSS', 'Flutter'] },
  { title: 'Backend', skills: ['Django', 'Node.js', 'MongoDB', 'MySQL'] },
  { title: 'Data Science & AI', skills: ['Pandas', 'NumPy', 'Matplotlib', 'PyTorch'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'CI/CD', 'VS Code', 'Figma', 'Canva'] },
];

const projects = [
  {
    title: 'CardiaCare',
    desc: 'AI-powered heart health suite featuring ECG analysis and AI report summarization.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python'],
    motif: 'ECG intelligence',
  },
  {
    title: 'Verve',
    desc: 'AI-powered nutrition and wellness platform for chronic disease management.',
    tech: ['Flutter', 'AI Integration'],
    motif: 'Wellness systems',
  },
  {
    title: 'Aurora Voices',
    desc: 'Full-stack MERN social platform enabling users to share poems, express thoughts, and interact in real time.',
    tech: ['MERN', 'Vercel', 'Render', 'MongoDB Atlas'],
    motif: 'Real-time expression',
  },
  {
    title: 'GazeVoice',
    desc: 'Browser-based AAC communication system for paralyzed patients using eye gaze tracking.',
    tech: ['WebGazer.js', 'Text-to-Speech'],
    motif: 'Assistive communication',
  },
];

const achievements = [
  ['Winner', 'Techgyan GEN AI Hackathon', 'NIT Trichy'],
  ['Winner', 'Techgyan Android App Development Hackathon', 'IIT Madras'],
  ['Winner', "Appathon'25", 'Sona College of Technology'],
  ['Finalist', 'Aventus 3.0', 'Dayananda Sagar College of Engineering'],
  ['Finalist', 'Sustain-A-Thon', 'Sharda University'],
  ['Finalist', 'AI Ignite 2026', 'SMVEC Puducherry'],
];

const codingStats = [
  { label: 'LeetCode', value: 160, suffix: '+ Problems Solved' },
  { label: 'SkillRack', value: 950, suffix: '+ Problems Solved' },
  { label: 'HackerRank', value: 4004, suffix: ' Hackos' },
];

const education = [
  ['Sri Eshwar College of Engineering', 'B.E CSE (AI & ML)', 'CGPA: 8.07'],
  ['Sri Vidya Mandir Matric Hr Sec School', 'HSC', '91%'],
  ['Bharath Hi-Tech Matric Hr Sec School', 'SSLC', '96.2%'],
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}

function useGsapReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 90, opacity: 0, filter: 'blur(18px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-section-theme]').forEach((section) => {
        const color = section.dataset.sectionTheme ?? '#090909';
        ScrollTrigger.create({
          trigger: section,
          start: 'top 62%',
          end: 'bottom 38%',
          onEnter: () => gsap.to('body', { backgroundColor: color, duration: 1.2, ease: 'none' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: color, duration: 1.2, ease: 'none' }),
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const target = { count: 0 };
    const tween = gsap.to(target, {
      count: value,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.floor(target.count)}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 max-w-4xl" data-reveal>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-flare">{eyebrow}</p>
      <h2 className="font-display text-5xl uppercase leading-[0.9] text-bone md:text-8xl">{title}</h2>
    </div>
  );
}

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-portrait-wrap', { opacity: 0 });
      gsap.set('.hero-text-content > *', { y: 40, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to('.hero-portrait-wrap', { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to('.hero-text-content > *', { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="hero-poster"
      data-section-theme="#090909"
      onMouseMove={(event) => {
        mx.set((event.clientX / window.innerWidth - 0.5) * 18);
        my.set((event.clientY / window.innerHeight - 0.5) * 18);
      }}
    >
      <motion.div
        className="hero-portrait-glow"
        style={{ x: springX, y: springY }}
      />
      <div className="hero-grid" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-5 py-6 md:px-10">
        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="max-w-2xl pt-8 lg:pt-0 hero-text-content">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.48em] text-flare">Creative Developer</p>
            <h1 className="hero-title">
              Hi, I Am{' '}
              <span className="vivek-text-animate">Vivek</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ash md:text-2xl">
              Full Stack Developer | AI Enthusiast | Vision Builder
            </p>
            <a className="hero-cta" href="#about">
              Find Out More <ArrowDown size={18} />
            </a>
          </div>

          <motion.div className="hero-portrait-wrap" style={{ x: springX, y: springY }}>
            <div className="hero-portrait-frame">
              <div className="hero-portrait-placeholder">
                <span className="text-[11px] font-bold uppercase tracking-[0.36em] text-ash">Portrait Image</span>
                <strong>Drop image in assets</strong>
              </div>
            </div>
            <div className="hero-side-caption">
              <span>Available for meaningful builds</span>
              <span className="relative h-12 w-[1px] overflow-hidden bg-white/20">
                <span className="absolute left-0 top-0 h-4 w-[1px] animate-scrollPulse bg-flare" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-grid bg-gradient-to-b from-void via-[#270505] to-blood" data-section-theme="#2b0505">
      <div className="sticky-visual">
        <div className="visual-orbit" data-reveal>
          <div className="absolute inset-8 border border-flare/30" />
          <div className="absolute left-8 top-8 h-24 w-24 border-l border-t border-flare" />
          <div className="absolute bottom-8 right-8 h-24 w-24 border-b border-r border-flare" />
          <Code2 className="relative z-10 h-24 w-24 text-flare" />
          <p className="relative z-10 mt-8 max-w-xs text-center text-sm uppercase tracking-[0.36em] text-ash">
            Ideas shaped into systems
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <SectionTitle eyebrow="About Me" title="A story in motion" />
        {aboutCards.map((text, index) => (
          <article key={text} className="story-card" data-reveal>
            <span className="text-sm font-bold text-flare">0{index + 1}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell bg-gradient-to-b from-blood via-[#190202] to-void" data-section-theme="#090909">
      <SectionTitle eyebrow="Experience" title="Timeline of practice" />
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-flare via-white/20 to-transparent md:left-1/2" />
        {internships.map((item, index) => (
          <div key={item.company} className={`timeline-item ${index % 2 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16'}`} data-reveal>
            <div className="timeline-dot" />
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-flare">{item.date}</p>
            <h3 className="mt-4 font-display text-4xl uppercase text-bone">{item.company}</h3>
            <p className="mt-2 text-lg text-ash">{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell bg-gradient-to-b from-void via-[#250404] to-blood" data-section-theme="#4a0606">
      <SectionTitle eyebrow="Skills" title="Tools with pulse" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className="skill-card"
            data-reveal
            whileHover={{ y: -14, rotate: index % 2 ? 1.5 : -1.5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <h3>{group.title}</h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectMockup({ title, motif }: { title: string; motif: string }) {
  return (
    <div className="mockup" aria-label={`${title} interface preview`}>
      <div className="mockup-top">
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-body">
        <div>
          <p>{motif}</p>
          <h4>{title}</h4>
        </div>
        <div className="wave-lines">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-gradient-to-b from-blood via-[#160101] to-void" data-section-theme="#090909">
      {projects.map((project, index) => (
        <article key={project.title} className="project-panel">
          <div className="project-copy" data-reveal>
            <p className="text-sm font-bold uppercase tracking-[0.42em] text-flare">Featured Project / 0{index + 1}</p>
            <h2>{project.title}</h2>
            <p className="max-w-2xl text-xl leading-relaxed text-ash">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span className="tech-badge" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a className="btn-primary" href="#contact">
                Live Demo <ArrowUpRight size={18} />
              </a>
              <a className="btn-secondary" href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub <Github size={18} />
              </a>
            </div>
          </div>
          <div data-reveal>
            <ProjectMockup title={project.title} motif={project.motif} />
          </div>
        </article>
      ))}
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="section-shell bg-gradient-to-b from-void via-[#2c0505] to-blood" data-section-theme="#3a0505">
      <SectionTitle eyebrow="Achievements" title="Proof under pressure" />
      <div className="achievement-grid">
        {achievements.map(([rank, title, place], index) => (
          <motion.article
            key={title}
            className="achievement-card"
            data-reveal
            whileHover={{ scale: 1.025, y: -8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            <Trophy className="mb-8 text-flare" size={32} />
            <span>0{index + 1}</span>
            <h3>{rank}</h3>
            <p>{title}</p>
            <small>{place}</small>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CodingProfiles() {
  return (
    <section className="section-shell bg-gradient-to-b from-blood via-[#150202] to-void" data-section-theme="#090909">
      <SectionTitle eyebrow="Coding Profiles" title="Numbers that compound" />
      <div className="grid gap-5 md:grid-cols-3">
        {codingStats.map((stat) => (
          <article className="stat-card" key={stat.label} data-reveal>
            <p>{stat.label}</p>
            <h3>
              <Counter value={stat.value} suffix={stat.suffix} />
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="certifications" className="section-shell bg-gradient-to-b from-void via-[#240404] to-blood" data-section-theme="#360505">
      <SectionTitle eyebrow="Education" title="Foundation and focus" />
      <div className="grid gap-4">
        {education.map(([school, degree, score], index) => (
          <article className="education-card" data-reveal key={school}>
            <span>0{index + 1}</span>
            <h3>{school}</h3>
            <p>{degree}</p>
            <strong>{score}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell min-h-screen bg-gradient-to-b from-blood via-[#160101] to-void" data-section-theme="#090909">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div data-reveal>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.48em] text-flare">Contact</p>
          <h2 className="font-display text-[18vw] uppercase leading-[0.78] text-bone lg:text-[8.2vw]">
            Let's Build
            <span className="block text-outline">Something</span>
            <span className="block text-flare">Amazing</span>
          </h2>
          <div className="mt-10 grid gap-3 text-ash sm:grid-cols-2">
            <a className="contact-link" href="mailto:vivekkk@example.com">
              <Mail size={18} /> vivekkk@example.com
            </a>
            <a className="contact-link" href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a className="contact-link" href="https://github.com/" target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a className="contact-link" href="tel:+910000000000">
              <Phone size={18} /> +91 00000 00000
            </a>
          </div>
        </div>
        <form className="contact-form" data-reveal>
          <input aria-label="Name" placeholder="Name" />
          <input aria-label="Email" type="email" placeholder="Email" />
          <textarea aria-label="Message" placeholder="Message" rows={6} />
          <button className="btn-primary w-full justify-center" type="button">
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-flare" style={{ scaleX }} />;
}

export default function App() {
  useLenis();
  useGsapReveals();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-bone">
      <ProgressBar />
      <div className="grain" />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <CodingProfiles />
      <Education />
      <Contact />
      <footer className="border-t border-white/10 bg-void px-5 py-8 text-center text-xs uppercase tracking-[0.36em] text-ash">
        Vivek K K / {year}
      </footer>
    </main>
  );
}
