import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = JSON.parse(fs.readFileSync(path.join(root, 'src/content/site.json'), 'utf8'));
const requiredPages = ['src/app/page.tsx','src/app/about/page.tsx','src/app/services/page.tsx','src/app/engineering-services/page.tsx','src/app/projects/page.tsx','src/app/certifications/page.tsx','src/app/contact/page.tsx','src/app/careers/page.tsx'];
for (const page of requiredPages) {
  if (!fs.existsSync(path.join(root, page))) throw new Error(`Missing page: ${page}`);
}
if (site.services.length < 7) throw new Error('Expected at least seven services from the brief');
if (!site.company.phone.includes('1224')) throw new Error('Company phone missing from content');
if (!site.placeholders.length) throw new Error('Placeholder notes must be present');
const forbidden = ['99.99%', 'Acme', 'Next-Gen', 'Unleash', 'Elevate'];
const all = JSON.stringify(site);
for (const term of forbidden) {
  if (all.includes(term)) throw new Error(`Forbidden generic copy found: ${term}`);
}
console.log('content integrity passed');
