"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contactLinks, education, certifications, navItems, profile, projects } from "@/data/portfolio";

const projectRoutes = projects.map((project) => ({
  ...project,
  href: `/projects/${project.slug}`,
}));

export function PortfolioHome() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("likhitha-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("likhitha-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionEls = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -35% 0px" }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const highlightSections = useMemo(
    () => navItems.map((item) => ({ ...item, active: activeSection === item.id })),
    [activeSection]
  );

  return (
    <>
      <header className="topbar">
        <div className="container nav-shell">
          <Link href="#home" className="brand" aria-label="Likhitha Bandaru home">
            <span className="brand-mark">LB</span>
            <span className="brand-text">
              <strong>Likhitha</strong>
              <small>Engineering with clarity</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {highlightSections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={item.active ? "nav-item active" : "nav-item"}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="nav-button secondary" href="/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf" download>
              Resume
            </a>
            <button
              type="button"
              className="theme-button"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button
              type="button"
              className="mobile-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={mobileMenuOpen ? "mobile-menu open" : "mobile-menu"}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "mobile-link active" : "mobile-link"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf" download className="mobile-link download-link">
            Download Resume
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">DATA & AI · SOFTWARE ENGINEERING · CLASS OF 2026</span>
              <h1>
                I build reliable data products and AI systems that turn raw information into action.
                <span className="name-lockup">{profile.name}</span>
              </h1>
              <p className="lede">{profile.summary}</p>
              <div className="cta-row">
                <a className="button primary" href="#projects">
                  Explore My Work
                </a>
                <a className="button secondary" href="/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf" download>
                  Download Resume
                </a>
                <a className="button ghost" href={contactLinks.github} target="_blank" rel="noreferrer">
                  View GitHub
                </a>
              </div>

              <div className="hero-stats" aria-label="Profile highlights">
                <div>
                  <strong>3</strong>
                  <span>Core projects</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>AWS cert</span>
                </div>
                <div>
                  <strong>8.7</strong>
                  <span>CGPA</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-frame">
                <div className="portrait-glow" />
                <Image
                  src="/likhitha-profile.jpg"
                  alt="Portrait of Likhitha Bandaru"
                  width={640}
                  height={760}
                  priority
                  className="portrait-photo"
                />
              </div>

              <div className="floating-card left-card">
                <span className="card-label">Specialization</span>
                <strong>Data & AI</strong>
              </div>

              <div className="floating-card right-card">
                <span className="card-label">Stack</span>
                <strong>Python · SQL · LLMs</strong>
              </div>

              <div className="diagram-panel">
                <div className="diagram-header">
                  <span className="dot dot-blue" />
                  <span className="dot dot-teal" />
                  <span className="dot dot-slate" />
                </div>
                <svg viewBox="0 0 260 140" aria-label="System architecture preview" role="img">
                  <rect x="18" y="18" width="80" height="56" rx="10" />
                  <rect x="120" y="18" width="118" height="56" rx="10" />
                  <rect x="90" y="92" width="90" height="30" rx="12" />
                  <path d="M98 46H120M200 74V92M130 92H150" />
                  <circle cx="90" cy="46" r="7" />
                  <circle cx="200" cy="46" r="7" />
                  <circle cx="130" cy="94" r="7" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="container section-head">
            <span className="section-kicker">About</span>
            <h2>Engineering with clarity, built around practical thinking.</h2>
          </div>
          <div className="container about-grid">
            <div className="about-copy">
              <p>
                I am a software engineer with a strong foundation in data engineering, backend systems, and applied AI.
                My work sits at the intersection of data products, MLOps, governance, and product-minded software design.
                I enjoy building reliable systems that help teams understand information clearly and act on it with confidence.
              </p>
              <p>
                My experience spans Python, advanced SQL, ETL/ELT pipelines, LLM-based interfaces, metadata-driven
                retrieval, and deployment workflows. I am especially interested in intelligent data products that combine
                engineering rigor with practical, business-facing value.
              </p>
            </div>
            <div className="philosophy-panel">
              <h3>Engineering approach</h3>
              <ol className="philosophy-list">
                <li><span>01</span> Understand the problem.</li>
                <li><span>02</span> Model the data and system.</li>
                <li><span>03</span> Implement clear interfaces.</li>
                <li><span>04</span> Test important behaviors.</li>
                <li><span>05</span> Document and improve.</li>
              </ol>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell muted-block">
          <div className="container section-head">
            <span className="section-kicker">Skills</span>
            <h2>Data, product, and AI engineering capabilities.</h2>
          </div>
          <div className="container skill-grid">
            <div className="skill-card">
              <h3>Programming</h3>
              <ul>{["Python", "SQL", "Java", "Go (basic)", "JavaScript"].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="skill-card">
              <h3>Data engineering</h3>
              <ul>{[
                "ETL / ELT pipelines",
                "Data products",
                "Data modeling",
                "Snowflake",
                "dbt",
                "Airflow / Astronomer",
                "Fivetran-style connectors",
                "Data warehouse design",
              ].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="skill-card">
              <h3>AI / ML</h3>
              <ul>{[
                "LLMs",
                "Generative AI",
                "RAG",
                "Prompt engineering",
                "Gemini",
                "Claude",
                "LangChain",
                "Embeddings",
                "Scikit-learn",
                "Pandas",
                "NumPy",
                "MLflow",
              ].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="skill-card">
              <h3>Backend</h3>
              <ul>{[
                "Flask",
                "REST APIs",
                "Authentication",
                "Input validation",
                "Error handling",
                "Docker",
                "CI / CD",
                "GitHub Actions",
              ].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="skill-card">
              <h3>Data governance</h3>
              <ul>{[
                "Metadata",
                "Data catalog",
                "Data classification tagging",
                "Data masking",
                "Role-based access control",
                "Data quality",
                "SLOs",
                "Compliance",
              ].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="skill-card">
              <h3>Core CS</h3>
              <ul>{[
                "Data Structures & Algorithms",
                "Object-Oriented Programming",
                "DBMS",
                "Operating Systems",
                "Computer Networks",
                "Software Engineering",
              ].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <div className="container section-head split-head">
            <div>
              <span className="section-kicker">Projects</span>
              <h2>Selected work in AI, data products, and MLOps.</h2>
            </div>
            <a className="inline-link" href={contactLinks.github} target="_blank" rel="noreferrer">
              View GitHub profile ↗
            </a>
          </div>

          <div className="container project-grid">
            {projectRoutes.map((project) => (
              <article key={project.slug} className="project-card">
                <div className="project-visual" aria-hidden="true">
                  <div className="project-chip">{project.status}</div>
                  <div className="project-preview preview-one" />
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <span className="project-kicker">{project.title}</span>
                    <h3>{project.subtitle}</h3>
                  </div>
                  <p>{project.summary}</p>
                  <ul className="tag-list">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <ul className="project-points">
                    {project.impact.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <Link href={project.href} className="button secondary small">
                      Read Case Study
                    </Link>
                    <a className="inline-link" href={contactLinks.github} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-shell muted-block">
          <div className="container section-head">
            <span className="section-kicker">Education</span>
            <h2>Academic foundation with a strong technical core.</h2>
          </div>
          <div className="container timeline">
            {education.map((item) => (
              <article key={item.title} className="timeline-item">
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-content">
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                  <strong>{item.gpa}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="container cert-grid">
            {certifications.map((cert) => (
              <div key={cert.name} className="cert-card">
                <span className="cert-label">Certification</span>
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
                <span className="cert-date">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="container contact-panel">
            <div>
              <span className="section-kicker">Contact</span>
              <h2>Let’s build something useful together.</h2>
            </div>
            <div className="contact-links">
              <a href={contactLinks.email}>likhithabandaru2005@gmail.com</a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={contactLinks.phone}>{profile.phone}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>{profile.name}</strong>
            <p>{profile.title}</p>
          </div>
          <div className="footer-links">
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <p>© 2026.</p>
        </div>
      </footer>
    </>
  );
}
