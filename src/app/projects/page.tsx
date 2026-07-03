import { PageIntro, PlaceholderNotice } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Projects and case studies" };
export default function ProjectsPage() {
  const plateClasses = ["offshore", "refuge", "refrigeration"];
  return (
    <>
      <PageIntro title="Project gallery ready for approved case studies.">The structure is ready for project names, images, outcomes and service tags once the client provides approved material.</PageIntro>
      <section className="section compact"><div className="container project-grid">
        {site.projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className={`project-plate ${plateClasses[index]}`} aria-label={`${project.name} visual placeholder`}>
              <span>Approved project photography required</span>
            </div>
            <div><p className="badge">{project.status}</p><h2>{project.name}</h2><p>{project.description}</p>{project.services.map((s) => <span className="badge" key={s}>{s}</span>)}</div>
          </article>
        ))}
      </div></section>
      <section className="section compact"><div className="container"><PlaceholderNotice /></div></section>
    </>
  );
}
