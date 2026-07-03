import { PageIntro } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Certifications and memberships" };
export default function CertificationsPage() {
  return (
    <>
      <PageIntro title="Compliance cues for procurement and safety teams.">This page highlights public research findings without inventing accreditations or legal claims.</PageIntro>
      <section className="section compact"><div className="container grid cert-grid">
        {site.certifications.map((item, index) => <article className={`tile ${index === 0 ? "major" : ""}`} key={item.title}><h2>{item.title}</h2><p>{item.text}</p></article>)}
      </div></section>
    </>
  );
}
