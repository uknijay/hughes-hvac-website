import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = ['src/app/layout.tsx','src/app/contact/ContactForm.tsx','src/app/globals.css'];
const source = files.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const checks = [
  ['skip link', source.includes('Skip to content')],
  ['focus visible style', source.includes(':focus-visible')],
  ['reduced motion', source.includes('prefers-reduced-motion')],
  ['form labels', source.includes('<label htmlFor="email"')],
  ['live status', source.includes('aria-live="polite"')],
  ['dynamic viewport unit', source.includes('100dvh')]
];
for (const [name, ok] of checks) {
  if (!ok) throw new Error(`Accessibility smoke check failed: ${name}`);
}
console.log('static accessibility checks passed');
