import { PageIntro } from "@/components/Layout";
import site from "@/content/site.json";

export const metadata = { title: "Engineering services and project management" };
export default function EngineeringPage() {
  return (
    <>
      <PageIntro title="Engineering services and project management.">From offshore surveys to commissioning packs, HVAC can support the full mechanical delivery chain.</PageIntro>
      <section className="section compact"><div className="container process">
        {site.engineering.map((step) => <article key={step.title}><h2>{step.title}</h2><p>{step.text}</p></article>)}
      </div></section>
      <section className="section compact"><div className="container split"><div className="engineering-plate" aria-label="Industrial engineering photography placeholder"><span>Approved workshop, offshore or commissioning photography required</span></div><div><h2>Work packs, drawings and HSE control.</h2><p className="lead">Research notes that HVAC compiles detailed work packages, produces CAD drawings, procures materials and includes HSE requirements in project delivery.</p></div></div></section>
    </>
  );
}
