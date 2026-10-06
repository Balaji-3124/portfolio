import { useEffect, useRef, useState } from "react";
import "./Projects.css";

/* =========================================================
   PROJECT IMAGES
   1. Put screenshots in src/assets (e.g. project1.png)
   2. Import them here, then use them as `image` below.
   (Uncomment once the files really exist, otherwise the build fails.)
========================================================= */

// import project1Img from "../../assets/project1.png";
// import project2Img from "../../assets/project2.png";

/* =========================================================
   PROJECT DATA
   Duplicate this shape for each real project (keep 4-6).
   `image` is optional. If it is set, the screenshot is shown;
   if not, the `gradient` is used as a fallback.
========================================================= */

const projects = [
  {
    id: "project-1",
    title: "Project Title One",
    description:
      "Short summary of what this project does and the problem it solves. Mention your role and the outcome.",
    tags: ["Django", "REST API", "PostgreSQL"],
    // image: project1Img,
    gradient: "linear-gradient(135deg, #ff4d00 0%, #ff9f40 100%)",
    github: "#",
    live: "#",
  },
  {
    id: "project-2",
    title: "Project Title Two",
    description:
      "Short summary of what this project does and the problem it solves. Mention your role and the outcome.",
    tags: ["React", "Tailwind CSS", "Node.js"],
    // image: project2Img,
    gradient: "linear-gradient(135deg, #2b2b2b 0%, #6b6b6b 100%)",
    github: "#",
    live: "#",
  },
  {
    id: "project-3",
    title: "Project Title Three",
    description:
      "Short summary of what this project does and the problem it solves. Mention your role and the outcome.",
    tags: ["Python", "SQL", "FastAPI"],
    gradient: "linear-gradient(135deg, #3776ab 0%, #64b5f6 100%)",
    github: "#",
    live: "#",
  },
  {
    id: "project-4",
    title: "Project Title Four",
    description:
      "Short summary of what this project does and the problem it solves. Mention your role and the outcome.",
    tags: ["Django", "React", "MongoDB"],
    gradient: "linear-gradient(135deg, #44b78b 0%, #8ee0bc 100%)",
    github: "#",
    live: "#",
  },
];

/* =========================================================
   REVEAL HOOK
   Adds `is-visible` once the element enters the viewport.
========================================================= */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* =========================================================
   SINGLE PROJECT ROW
========================================================= */

function ProjectRow({ project, index }) {
  const [ref, visible] = useReveal();
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div className={`project-row project-row-${side}`}>
      <article
        ref={ref}
        className={`project-card reveal-${side} ${visible ? "is-visible" : ""}`}
      >
        <div
          className={`project-thumb ${project.image ? "has-image" : ""}`}
          style={!project.image ? { background: project.gradient } : undefined}
        >
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="project-thumb-img"
              loading="lazy"
            />
          )}
          <span className="project-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="project-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link-secondary"
            >
              Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link-primary"
            >
              Live Demo →
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function Projects() {
  return (
    <section id="projects" className="projects-section">
      {/* Big background text — stays fixed while cards scroll over it */}
      <div className="projects-bg" aria-hidden="true">
        <span className="projects-bg-text">WORK</span>
      </div>

      <div className="projects-wrapper">
        <div className="projects-header">
          <div className="projects-label">
            <span className="projects-label-dot" />
            Featured Work
          </div>
          <h2 className="projects-title">
            My <span>Projects</span>
          </h2>
          <p className="projects-subtitle">
            A selection of things I've built while learning and growing
            as a developer.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;