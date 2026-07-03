"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    if (!email.includes("@")) {
      setStatus("Enter a valid email address before sending.");
      return;
    }
    setStatus("Demo submission captured locally. Connect NEXT_PUBLIC_CONTACT_ENDPOINT before production launch.");
    form.reset();
  }
  return (
    <form className="form-grid" onSubmit={submit} noValidate>
      <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required aria-describedby="email-help" /><p id="email-help" className="help">A client-approved enquiry inbox is required before launch.</p></div>
      <div className="field"><label htmlFor="service">Service area</label><select id="service" name="service"><option>HVAC systems</option><option>Refrigeration</option><option>PFEER / TR testing</option><option>LEV testing</option><option>Engineering services</option><option>Other enquiry</option></select></div>
      <div className="field"><label htmlFor="message">Project details</label><textarea id="message" name="message" required /></div>
      <button className="button" type="submit">Send enquiry</button>
      <p role="status" aria-live="polite" className="help">{status}</p>
    </form>
  );
}
