import { PageIntro, PlaceholderNotice } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Projects and case studies" };
export default function ProjectsPage() {
  const images = [site.images.engineRoom, site.images.workshop, site.images.ducting];
  return (
    <>
      <PageIntro title="Project gallery ready for approved case studies.">The structure is ready for project names, images, outcomes and service tags once the client provides approved material.</PageIntro>
      <section className="section compact"><div className="container project-grid">
        {site.projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <img src={images[index]} alt={`${project.name} placeholder industrial project image`} />
            <div><p className="badge">{project.status}</p><h2>{project.name}</h2><p>{project.description}</p>{project.services.map((s) => <span className="badge" key={s}>{s}</span>)}</div>
          </article>
        ))}
      </div></section>
      <section className="section compact"><div className="container"><PlaceholderNotice /></div></section>
    </>
  );
}
