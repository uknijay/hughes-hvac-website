import { PageIntro } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Services" };
export default function ServicesPage() {
  return (
    <>
      <PageIntro title="HVAC services for offshore, marine and onshore sites.">The service content below is sourced from the research file and kept in structured JSON for CMS migration.</PageIntro>
      <section className="section compact">
        <div className="container grid services-grid">
          {site.services.map((service, index) => (
            <article id={service.slug} className={`tile ${index === 0 ? "major" : ""}`} key={service.slug}>
              <div>
                <h2>{service.title}</h2>
                <p>{service.body}</p>
                <h3>Typical scope</h3>
                <ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
