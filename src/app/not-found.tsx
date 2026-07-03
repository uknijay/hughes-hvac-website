import Link from "next/link";
export default function NotFound() {
  return <section className="section"><div className="container section-head"><h1>Page not found.</h1><p className="lead">The page may have moved. Return to the service overview or contact page.</p><Link className="button" href="/services">View services</Link></div></section>;
}
