import { PageIntro, PlaceholderNotice } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Careers" };
export default function CareersPage() {
  return (
    <>
      <PageIntro title="Careers and recruitment.">{site.careers.intro}</PageIntro>
      <section className="section compact"><div className="container project-grid">
        {site.careers.openings.map((job) => <article className="tile" key={job.title}><h2>{job.title}</h2><p>{job.location}</p><p>{job.type}</p><p>{job.description}</p></article>)}
      </div></section>
      <section className="section compact"><div className="container"><PlaceholderNotice /></div></section>
    </>
  );
}
