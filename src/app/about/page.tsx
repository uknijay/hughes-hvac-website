import { PageIntro, PlaceholderNotice } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "About" };
export default function AboutPage() {
  return (
    <>
      <PageIntro title="Aberdeen engineers serving marine and offshore projects.">{site.company.summary}</PageIntro>
      <section className="section compact"><div className="container split"><div><h2>Founded in 2014.</h2><p className="lead">Hughes Ventilation Air Conditioning Ltd was incorporated on 20 August 2014 and remains active at Companies House.</p><p>{site.company.mission}</p></div><div className="dark-panel"><h3>Registered details</h3><p>Company number: {site.company.companyNumber}</p><p>Status: {site.company.status}</p><p>SIC: {site.company.sic}</p><p>Registered office: {site.company.address}</p></div></div></section>
      <section className="section compact"><div className="container"><div className="section-head"><h2>Leadership</h2><p className="lead">Names and roles are from public research. Profile copy should be approved by the client.</p></div><div className="project-grid">{site.people.map((person) => <article className="tile" key={person.name}><h3>{person.name}</h3><p><strong>{person.role}</strong></p><p>{person.bio}</p></article>)}</div><PlaceholderNotice /></div></section>
    </>
  );
}
