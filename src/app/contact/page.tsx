import { PageIntro } from "@/components/Layout";
import site from "@/content/site.json";
import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact Hughes HVAC.">Use the phone number below for direct enquiries. The form is ready for integration with the client&apos;s preferred inbox or CRM.</PageIntro>
      <section className="section compact"><div className="container split"><div className="dark-panel"><h2>Headquarters</h2><p>{site.company.address}</p><p><strong>Phone:</strong> {site.company.phone}</p><p><strong>Opening hours:</strong> {site.company.openingHours}</p><p>Email is not publicly listed in the research file.</p></div><ContactForm /></div></section>
      <section className="section compact"><div className="container"><div className="placeholder"><strong>Map placeholder:</strong> Add the client&apos;s approved map embed through NEXT_PUBLIC_MAP_EMBED_URL or replace this block during deployment.</div></div></section>
    </>
  );
}
