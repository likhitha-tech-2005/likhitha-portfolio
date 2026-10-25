import Link from "next/link";
import { projects } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <main className="project-list-page">
      <div className="container narrow-shell">
        <p className="section-kicker">Projects</p>
        <h1>Selected engineering work.</h1>
        <div className="project-list-stack">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="project-list-item">
              <div>
                <span className="project-tag">{project.status}</span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </div>
              <span className="read-more">Read case study →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
