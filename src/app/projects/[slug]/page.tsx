import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDetails, projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];

  if (!project) {
    notFound();
  }

  return (
    <main className="case-study-page">
      <div className="container narrow-shell">
        <Link href="/" className="back-link">← Back to home</Link>
        <header className="case-header">
          <p className="section-kicker">Case Study</p>
          <h1>{project.title}</h1>
        </header>

        <section className="case-block">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="case-grid">
          <div className="case-block">
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </div>
          <div className="case-block">
            <h2>Goals</h2>
            <ul>
              {project.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-block">
          <h2>Key features</h2>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="case-grid">
          <div className="case-block">
            <h2>Stack</h2>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="case-block">
            <h2>Architecture</h2>
            <ul>
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-block diagram-box">
          <h2>System sketch</h2>
          <svg viewBox="0 0 600 220" aria-label="Project architecture diagram" role="img">
            <rect x="40" y="80" width="140" height="72" rx="16" />
            <rect x="228" y="48" width="160" height="136" rx="20" />
            <rect x="436" y="80" width="120" height="72" rx="16" />
            <path d="M180 116H228M388 116H436M290 184V200H310V184" />
            <text x="74" y="120">Client</text>
            <text x="274" y="116">Application</text>
            <text x="470" y="120">Database</text>
          </svg>
        </section>

        <section className="case-grid">
          <div className="case-block">
            <h2>Testing & validation</h2>
            <ul>
              {project.testing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="case-block">
            <h2>Lessons</h2>
            <ul>
              {project.lessons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
