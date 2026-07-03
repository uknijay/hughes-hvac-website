import Link from "next/link";
import site from "@/content/site.json";
import { BrandLogo } from "@/components/Brand";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Hughes HVAC home">
          <BrandLogo />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {site.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="nav-cta" href="/contact">Contact</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{site.company.name}</strong>
          <p>{site.company.address}</p>
          <p>{site.company.phone}</p>
        </div>
        <div><strong>Company</strong><p><Link href="/about">About</Link></p><p><Link href="/careers">Careers</Link></p></div>
        <div><strong>Services</strong><p><Link href="/services">Service overview</Link></p><p><Link href="/engineering-services">Engineering services</Link></p></div>
        <div><strong>Legal</strong><p>Privacy policy placeholder</p><p>Terms placeholder</p></div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="section compact">
      <div className="container section-head reveal">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <div className="lead">{children}</div>
      </div>
    </section>
  );
}

export function PlaceholderNotice() {
  return <aside className="placeholder"><strong>Client content required:</strong> Some case study, legal, recruitment, email and leadership profile content is intentionally marked as placeholder until the client supplies approved wording.</aside>;
}
