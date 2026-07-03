import Image from "next/image";
import Link from "next/link";
import site from "@/content/site.json";

export default function Home() {
  const featured = site.services;
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <p className="eyebrow">Aberdeen offshore and marine HVAC</p>
            <h1>Engineered air systems for harsh sites.</h1>
            <p className="lead">HVAC, refrigeration, testing and commissioning support for offshore, marine and onshore industrial projects.</p>
            <div className="hero-actions">
              <Link className="button" href="/contact">Discuss a project</Link>
              <Link className="ghost-button" href="/services">View services</Link>
            </div>
          </div>
          <div className="hero-card reveal" aria-label="Offshore industrial HVAC visual placeholder">
            <Image src={site.images.hero} alt="Offshore industrial platform placeholder for HVAC project photography" width={1800} height={1200} priority sizes="(max-width: 880px) 100vw, 48vw" />
            <p className="image-note">Placeholder image. Replace with approved offshore, workshop or engineering photography before launch.</p>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Company facts">
        <div className="stat"><strong>2014</strong><span>Incorporated in Scotland</span></div>
        <div className="stat"><strong>AB12</strong><span>Portlethen, Aberdeen headquarters</span></div>
        <div className="stat"><strong>SC484707</strong><span>Companies House number</span></div>
        <div className="stat"><strong>BSRIA</strong><span>Listed industry membership</span></div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Practical engineered solutions, from survey to handover.</h2>
            <p className="lead">The company mission is direct: top-class service, certified materials, qualified personnel and competitive market costs.</p>
          </div>
          <div className="grid services-grid">
            <article className="tile major">
              <div><h3>Turnkey project support</h3><p>Surveys, work packs, CAD drawings, procurement, fabrication, installation, commissioning and documentation.</p></div>
              <Link className="button" href="/engineering-services">Engineering services</Link>
            </article>
            {featured.map((service) => (
              <article className="tile" key={service.slug}>
                <div><h3>{service.title}</h3><p>{service.summary}</p></div>
                <Link className="tile-link" href={`/services#${service.slug}`}>Read more</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container split">
          <div>
            <h2>Built for demanding industrial environments.</h2>
            <p className="lead">HVAC works across marine and offshore applications where reliability, safety and documentation matter.</p>
          </div>
          <div className="dark-panel">
            <h3>Typical environments</h3>
            <ul>
              <li>Offshore platforms and hazardous areas</li>
              <li>FPSOs, offshore supply vessels and jack-up drilling rigs</li>
              <li>Onshore industrial facilities and workshops</li>
              <li>Engine rooms, switch rooms and accommodation areas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="container split">
          <div>
            <h2>Bring HVAC in early.</h2>
            <p className="lead">For surveys, ventilation, refrigeration, testing or commissioning enquiries, contact the Portlethen office.</p>
          </div>
          <div>
            <p><strong>Phone:</strong> {site.company.phone}</p>
            <p><strong>Hours:</strong> {site.company.openingHours}</p>
            <Link className="button" href="/contact">Contact the team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
