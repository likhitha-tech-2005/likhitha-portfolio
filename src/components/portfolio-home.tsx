"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  certifications,
  contactLinks,
  education,
  navItems,
  profile,
  publicAssetPath,
  projects,
  skills,
} from "@/data/portfolio";

const skillGroups = [
  { id: "programming", label: "Programming", icon: "</>", items: skills.programming },
  { id: "data", label: "Data engineering", icon: "01", items: skills.dataEngineering },
  { id: "ai", label: "AI & machine learning", icon: "✳", items: skills.aiAndMl },
  { id: "ops", label: "MLOps & DevOps", icon: "↗", items: skills.mlopsAndDevops },
  { id: "governance", label: "Data governance", icon: "◈", items: skills.dataGovernance },
  { id: "engineering", label: "Software engineering", icon: "⌘", items: skills.softwareEngineering },
] as const;

const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf`;
const profileImageUrl = publicAssetPath("/likhitha-profile.jpg");

type Toast = { id: number; title: string; detail: string };

type IconName = "arrow" | "download" | "mail" | "copy" | "linkedin" | "github" | "phone" | "spark";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    arrow: "M7 17 17 7M7 7h10v10",
    download: "M12 3v12m-5-5 5 5 5-5M5 20h14",
    mail: "M3 5h18v14H3zM3 6l9 7 9-7",
    copy: "M8 8h11v13H8zM5 16H3V3h11v2",
    linkedin: "M5 9v10M5 5v.01M9 19v-6a4 4 0 0 1 8 0v6m-8-6v6",
    github: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.4 1.1 4.2 1.5 4.2 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22",
    phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.3 10a16 16 0 0 0 6 6l1.6-1.7a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.4 2.7Z",
    spark: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

export function PortfolioHome() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(270);
  const [novaOpen, setNovaOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome", detail: "Explore Likhitha’s selected work and background." },
  ]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const notificationId = useRef(1);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-15% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setNovaOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((current) => current.slice(0, -1)), 2800);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const notify = (title: string, detail: string) => {
    const id = ++notificationId.current;
    setToasts((current) => [{ id, title, detail }, ...current].slice(0, 3));
    setNotifications((current) => [{ id, title, detail }, ...current].slice(0, 5));
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    setNovaOpen(false);
    notify("Section opened", navItems.find((item) => item.id === id)?.label ?? id);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Likhitha_Bandaru_Resume_IBM_Data_AI.pdf";
    link.click();
    notify("Resume", "Your download has started.");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify("Email copied", profile.email);
    } catch {
      notify("Copy unavailable", "Use the email link to get in touch.");
    }
  };

  const resizeSidebar = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.buttons !== 1) return;
    setSidebarWidth(Math.min(360, Math.max(220, event.clientX)));
  };

  const adjustSidebarWidth = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setSidebarWidth((width) =>
        Math.min(360, Math.max(220, width + (event.key === "ArrowRight" ? 12 : -12))),
      );
    }
  };

  return (
    <>
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <aside
        className={sidebarOpen ? "sidebar" : "sidebar collapsed"}
        aria-hidden={!sidebarOpen}
        style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
      >
        <a className="identity" href="#home" aria-label="Likhitha Bandaru — home">
          <Image
            src={profileImageUrl}
            alt=""
            width={48}
            height={48}
            className="identity-avatar"
          />
          <span className="identity-copy">
            <span className="identity-name">Likhitha Bandaru</span>
            <span className="identity-role">Software Engineer · Data & AI</span>
          </span>
        </a>

        <div className="sidebar-rule" />
        <p className="sidebar-label">Explore</p>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "side-link active" : "side-link"}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.id);
              }}
            >
              <span className="side-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <span className="side-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="availability"><i /> {profile.location}</span>
          <a className="sidebar-email" href={contactLinks.email}>Let&apos;s connect <span>↗</span></a>
          <div className="sidebar-socials">
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <button
          type="button"
          role="separator"
          aria-label="Resize sidebar"
          aria-orientation="vertical"
          aria-valuemin={220}
          aria-valuemax={360}
          aria-valuenow={sidebarWidth}
          className="sidebar-resize"
          onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
          onPointerMove={resizeSidebar}
          onKeyDown={adjustSidebarWidth}
        />
      </aside>

      <button
        type="button"
        className={sidebarOpen ? "sidebar-toggle" : "sidebar-toggle is-closed"}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={sidebarOpen}
        style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span aria-hidden="true">{sidebarOpen ? "‹" : "›"}</span>
        <span className="sidebar-toggle-label">{sidebarOpen ? "Hide menu" : "Show menu"}</span>
      </button>

      <header className="mobile-header">
        <a className="mobile-brand" href="#home">LB<span>.</span></a>
        <button
          type="button"
          className="mobile-menu-trigger"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"} <span>{menuOpen ? "×" : "☰"}</span>
        </button>
        <nav className={menuOpen ? "mobile-nav open" : "mobile-nav"} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goTo(item.id)}>{item.label}</button>
          ))}
          <button type="button" onClick={downloadResume}>Download resume</button>
        </nav>
      </header>

      <main
        className={sidebarOpen ? "portfolio-main" : "portfolio-main sidebar-hidden"}
        style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
      >
        <section id="home" className="hero-section">
          <div className="hero-topline">
            <span className="eyebrow"><i /> PORTFOLIO · 2026</span>
            <button
              type="button"
              className="updates-toggle"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <span className="updates-indicator" /> Updates <span className="updates-count">{notifications.length}</span>
            </button>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">Software Engineer · Data & AI</p>
              <h1>
                <span className="hero-name">Likhitha Bandaru</span>
                <span className="hero-headline">Building reliable data products and AI systems.</span>
              </h1>
              <p className="hero-summary">
                I work across Python, SQL, data engineering, and generative AI to create software
                that is useful, understandable, and built with care.
              </p>
              <div className="hero-actions">
                <button type="button" className="action-primary" onClick={() => goTo("projects")}>
                  Explore selected work <span>↗</span>
                </button>
                <button type="button" className="action-text" onClick={downloadResume}>
                  Download resume <span>↓</span>
                </button>
              </div>
              <div className="hero-meta">
                <span><b>01</b> Python & SQL</span>
                <span><b>02</b> Data engineering</span>
                <span><b>03</b> Generative AI</span>
              </div>
            </div>

            <div className="hero-portrait-wrap">
              <div className="portrait-image-frame">
                <Image
                  src={profileImageUrl}
                  alt="Portrait of Likhitha Bandaru"
                  width={640}
                  height={760}
                  priority
                  className="portrait-image"
                />
              </div>
              <div className="portrait-caption">
                <span className="caption-mark">LB</span>
                <span><strong>Likhitha Bandaru</strong><br />Software Engineer · Data & AI</span>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <span>SCROLL TO DISCOVER</span>
            <span className="scroll-line" />
            <span>SOFTWARE ENGINEER · DATA & AI</span>
          </div>
        </section>

        <section id="about" className="content-section about-section">
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <span className="section-note">A little context</span>
          </div>
          <div className="about-layout">
            <h2>Curiosity is the<br /><em>starting point.</em></h2>
            <div className="about-copy">
              <p>
                I&apos;m a B.Tech Information Technology student at Sri Venkateswara College of
                Engineering, building a strong foundation across software engineering, data
                systems, and applied AI.
              </p>
              <p>
                I work with Python and SQL to shape reliable data products, and explore how
                retrieval-augmented generation can make information easier to use. I care about
                the details behind useful software: clear interfaces, thoughtful validation,
                testing, and responsible data handling.
              </p>
              <a className="inline-cta" href="#contact" onClick={(event) => { event.preventDefault(); goTo("contact"); }}>
                More about my approach <span>↗</span>
              </a>
            </div>
          </div>
          <div className="principles-grid">
            <article><span>01</span><strong>Start with the problem</strong><p>Understand the people, constraints, and context before choosing the tools.</p></article>
            <article><span>02</span><strong>Make data dependable</strong><p>Build quality, governance, and clear ownership into the design.</p></article>
            <article><span>03</span><strong>Ship with care</strong><p>Test important behaviors and make systems easier to operate and improve.</p></article>
          </div>
        </section>

        <section id="skills" className="content-section skills-section">
          <div className="section-heading">
            <span className="section-index">02 / CAPABILITIES</span>
            <span className="section-note">Tools are only part of the work</span>
          </div>
          <div className="section-title-row">
            <h2>Technical <em>toolkit.</em></h2>
            <p>Technologies and practices I use to solve problems and build reliable products.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-tile" key={group.id}>
                <div className="skill-tile-head"><span>{group.icon}</span><span className="tile-arrow">↗</span></div>
                <h3>{group.label}</h3>
                <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-heading">
            <span className="section-index">03 / SELECTED WORK</span>
            <span className="section-note">Three ideas, built with intent</span>
          </div>
          <div className="section-title-row">
            <h2>Work in <em>progress.</em></h2>
            <a className="inline-cta" href={contactLinks.github} target="_blank" rel="noreferrer">
              Visit GitHub profile <span>↗</span>
            </a>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-entry" key={project.slug}>
                <div className="project-visual">
                  <Image
                    src={project.image}
                    alt={`${project.title} project illustration`}
                    width={720}
                    height={520}
                    className="project-image"
                  />
                  <span className="project-visual-label">{String(index + 1).padStart(2, "0")} — FEATURED PROJECT</span>
                </div>
                <div className="project-copy">
                  <div className="project-title-line">
                    <span className="project-status"><i /> {project.status}</span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="project-highlights">
                    {project.impact.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <ul className="project-tags">
                    {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  <div className="project-actions">
                    <Link href={`/projects/${project.slug}`} className="project-case-link">
                      Explore case study <span>↗</span>
                    </Link>
                    <a href={project.github ?? contactLinks.github} target="_blank" rel="noreferrer" className="project-github">
                      {project.github ? "Project GitHub" : "GitHub profile"} <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section education-section">
          <div className="section-heading">
            <span className="section-index">04 / EDUCATION</span>
            <span className="section-note">Learning with purpose</span>
          </div>
          <div className="section-title-row">
            <h2>The foundation <em>matters.</em></h2>
            <p>Grounded in computer science, growing through hands-on engineering.</p>
          </div>
          <div className="education-list">
            {education.map((item, index) => (
              <article className="education-entry" key={item.title}>
                <span className="education-index">0{index + 1}</span>
                <div><span className="education-period">{item.period}</span><h3>{item.title}</h3><p>{item.institution}</p></div>
                <strong>{item.gpa}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="content-section certifications-section">
          <div className="section-heading">
            <span className="section-index">05 / CERTIFICATIONS</span>
            <span className="section-note">Continuous learning</span>
          </div>
          <div className="certification-grid">
            {certifications.map((cert, index) => (
              <article className="certification-card" key={cert.name}>
                <span className="cert-icon">{index === 0 ? "AWS" : "TM"}</span>
                <span className="cert-date">{cert.date}</span>
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="foundations" className="content-section foundations-section">
          <div className="section-heading">
            <span className="section-index">06 / PROFESSIONAL FOUNDATIONS</span>
            <span className="section-note">Core knowledge, practical habits</span>
          </div>
          <div className="section-title-row">
            <h2>Built on solid <em>fundamentals.</em></h2>
            <p>
              Computer science foundations, an intentional development workflow, and communication
              across three languages.
            </p>
          </div>
          <div className="foundations-grid">
            <article className="foundation-panel">
              <div className="foundation-panel-heading">
                <span className="foundation-icon"><Icon name="spark" /></span>
                <div><span>ACADEMIC BASE</span><h3>Relevant coursework</h3></div>
              </div>
              <ul className="coursework-list">
                {profile.coursework.map((course, index) => (
                  <li key={course}><span>0{index + 1}</span>{course}</li>
                ))}
              </ul>
            </article>

            <article className="foundation-panel">
              <div className="foundation-panel-heading">
                <span className="foundation-icon"><Icon name="github" /></span>
                <div><span>HOW I APPROACH THE WORK</span><h3>Engineering workflow</h3></div>
              </div>
              <ol className="workflow-list">
                <li><span>01</span><div><strong>Understand</strong><small>Clarify the problem, users, and constraints.</small></div></li>
                <li><span>02</span><div><strong>Design</strong><small>Model data and define simple system boundaries.</small></div></li>
                <li><span>03</span><div><strong>Build & validate</strong><small>Implement, test key behaviors, and check data quality.</small></div></li>
                <li><span>04</span><div><strong>Deliver</strong><small>Use version control, automation, and clear documentation.</small></div></li>
              </ol>
            </article>

            <article className="foundation-panel language-panel">
              <div className="foundation-panel-heading">
                <span className="foundation-icon"><Icon name="mail" /></span>
                <div><span>COMMUNICATION</span><h3>Languages</h3></div>
              </div>
              <p>Languages listed in my profile:</p>
              <ul className="language-list">
                {profile.languages.map((language) => (
                  <li key={language}><span className="language-mark">{language.slice(0, 1)}</span>{language}</li>
                ))}
              </ul>
              <a href={contactLinks.email} className="foundation-contact-link">
                Connect with me <Icon name="arrow" />
              </a>
            </article>
          </div>
        </section>

        <section className="audience-section" aria-labelledby="audience-title">
          <div className="section-heading">
            <span className="section-index">A QUICK INTRODUCTION</span>
            <span className="section-note">Useful for hiring teams & collaborators</span>
          </div>
          <div className="audience-heading">
            <div>
              <span className="audience-kicker"><Icon name="spark" /> A clearer first look</span>
              <h2 id="audience-title">Everything important,<br /><em>one click away.</em></h2>
            </div>
            <p>
              A concise overview of my background, the work I&apos;ve explored, and where to continue
              the conversation.
            </p>
          </div>
          <div className="audience-grid">
            <article className="audience-card recruiter-card">
              <div className="audience-icon"><Icon name="linkedin" /></div>
              <span className="audience-label">FOR RECRUITERS & HR</span>
              <h3>Candidate snapshot</h3>
              <p>Information to help you quickly assess my education, focus areas, and project work.</p>
              <div className="snapshot-facts">
                <div><span>Degree</span><strong>B.Tech · Information Technology</strong></div>
                <div><span>Graduation</span><strong>2026</strong></div>
                <div><span>Academic result</span><strong>CGPA 8.7 / 10</strong></div>
                <div><span>Focus</span><strong>Software · Data · AI</strong></div>
              </div>
              <div className="audience-actions">
                <button type="button" className="audience-primary" onClick={downloadResume}>
                  <Icon name="download" /> Download resume <Icon name="arrow" />
                </button>
                <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="audience-secondary">
                  <Icon name="linkedin" /> LinkedIn profile
                </a>
              </div>
            </article>

            <article className="audience-card collaborator-card">
              <div className="audience-icon"><Icon name="github" /></div>
              <span className="audience-label">FOR CLIENTS & COLLABORATORS</span>
              <h3>Explore how I think</h3>
              <p>Walk through the ideas, technical choices, and quality considerations behind my projects.</p>
              <div className="work-links">
                {projects.map((project, index) => (
                  <Link href={`/projects/${project.slug}`} key={project.slug}>
                    <span className="work-link-index">0{index + 1}</span>
                    <span><strong>{project.title}</strong><small>{project.subtitle}</small></span>
                    <Icon name="arrow" />
                  </Link>
                ))}
              </div>
              <div className="audience-actions">
                <a href={contactLinks.github} target="_blank" rel="noreferrer" className="audience-primary">
                  <Icon name="github" /> Browse GitHub <Icon name="arrow" />
                </a>
                <button type="button" className="audience-secondary" onClick={() => goTo("contact")}>
                  <Icon name="mail" /> Start a conversation
                </button>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <span className="section-index">07 / CONTACT</span>
            <p className="contact-overline">For roles, project questions, and thoughtful conversations</p>
            <h2>Let&apos;s talk<br /><em>about what&apos;s next.</em></h2>
            <a href={contactLinks.email} className="contact-email-link">
              {profile.email} <Icon name="arrow" />
            </a>
            <div className="contact-actions">
              <a href={contactLinks.email} className="action-primary"><Icon name="mail" /> Email me <Icon name="arrow" /></a>
              <button type="button" className="contact-copy" onClick={copyEmail}><Icon name="copy" /> Copy email</button>
            </div>
            <div className="contact-links">
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn <Icon name="arrow" /></a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow" /></a>
              <a href={contactLinks.phone}><Icon name="phone" /> {profile.phone}</a>
            </div>
          </div>
          <aside className="contact-profile-card">
            <div className="contact-profile-image">
              <Image
                src={profileImageUrl}
                alt="Likhitha Bandaru, Software Engineer focused on Data and AI"
                width={640}
                height={760}
                className="contact-portrait"
              />
            </div>
            <div className="contact-profile-caption">
              <div><strong>Likhitha Bandaru</strong><span>Software Engineer · Data & AI</span></div>
              <span className="contact-profile-mark">LB</span>
            </div>
            <span className="contact-profile-location">{profile.location}</span>
          </aside>
        </section>

        <footer className="site-footer">
          <span>© 2026 {profile.name}</span>
          <span>Designed with curiosity & care.</span>
          <a href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }}>Back to top ↑</a>
        </footer>
      </main>

      {notificationsOpen && (
        <aside className="updates-panel" aria-label="Portfolio updates">
          <div className="updates-panel-head">
            <span>Recent updates</span>
            <button type="button" onClick={() => setNotificationsOpen(false)} aria-label="Close updates">×</button>
          </div>
          <ul>{notifications.map((item) => (
            <li key={item.id}><i /><div><strong>{item.title}</strong><span>{item.detail}</span></div></li>
          ))}</ul>
        </aside>
      )}

      <div className="nova-widget">
        {novaOpen && (
          <div className="nova-card" aria-label="Nova portfolio assistant">
            <div className="nova-card-head"><span><i /> NOVA · PORTFOLIO GUIDE</span><button type="button" onClick={() => setNovaOpen(false)} aria-label="Close Nova">×</button></div>
            <p>Hi, I can help you find the right part of Likhitha&apos;s portfolio.</p>
            <button type="button" onClick={() => goTo("about")}>Who is Likhitha? <span>↗</span></button>
            <button type="button" onClick={() => goTo("projects")}>Explore selected work <span>↗</span></button>
            <button type="button" onClick={() => goTo("skills")}>Browse technical skills <span>↗</span></button>
            <button type="button" onClick={downloadResume}>Download resume <span>↓</span></button>
            <button type="button" onClick={() => goTo("contact")}>Get in touch <span>↗</span></button>
          </div>
        )}
        <button
          type="button"
          className="nova-launcher"
          aria-expanded={novaOpen}
          onClick={() => setNovaOpen((open) => !open)}
        >
          <span className="nova-face"><i /><i /></span>
          <span>{novaOpen ? "Close Nova" : "Ask Nova"}</span>
          <span className="nova-launcher-arrow">{novaOpen ? "×" : "↗"}</span>
        </button>
      </div>

      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => <div className="toast" key={toast.id}><i /><span><strong>{toast.title}</strong><small>{toast.detail}</small></span></div>)}
      </div>
    </>
  );
}
