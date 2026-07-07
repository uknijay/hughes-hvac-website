import Link from "next/link";
import { PageIntro } from "@/components/Layout";

export const metadata = { title: "Admin" };

const editablePages = [
  { label: "Home", href: "/?admin=1" },
  { label: "Services", href: "/services?admin=1" },
  { label: "Engineering", href: "/engineering-services?admin=1" },
  { label: "Projects", href: "/projects?admin=1" },
  { label: "About", href: "/about?admin=1" },
  { label: "Contact", href: "/contact?admin=1" },
  { label: "Certifications", href: "/certifications?admin=1" },
  { label: "Careers", href: "/careers?admin=1" }
];

export default function AdminPage() {
  return (
    <>
      <PageIntro title="Owner admin panel.">Log in through the admin panel, open any page in editor mode, click outlined copy or image areas, then save changes to the database.</PageIntro>
      <section className="section compact">
        <div className="container grid cert-grid">
          <article className="tile major">
            <div>
              <h2>Editing workflow</h2>
              <p>Use the floating panel to save copy, upload replacement photography, export the database JSON, import a previous export, and store requested changes for the final owner review pass.</p>
            </div>
          </article>
          <article className="tile">
            <h2>Open a page to edit</h2>
            <p>Each link below opens the live page with the admin editor enabled.</p>
            <div>{editablePages.map((page) => <Link className="badge" href={page.href} key={page.href}>{page.label}</Link>)}</div>
          </article>
          <article className="tile">
            <h2>Deployment database</h2>
            <p>Local testing writes to <code>.data/cms-db.json</code>. Vercel should use Vercel Postgres for content and change requests, plus Vercel Blob for uploaded images.</p>
          </article>
          <article className="tile">
            <h2>Owner feedback</h2>
            <p>The change-request form stores notes in the same database export so Jay can review requested edits after the owners finish their pass.</p>
          </article>
        </div>
      </section>
    </>
  );
}
