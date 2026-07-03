# Security notes

## Current state

- No secrets are committed.
- `.env.example` documents optional public environment variables.
- Contact form does not send data to a backend in this prototype.
- No user-generated HTML is rendered.

## Before production

- Implement server-side form handling with spam protection and rate limiting.
- Store credentials only in the hosting provider secret store.
- Add privacy policy wording for enquiry data handling.
- Confirm map embeds and analytics tools comply with the client's privacy requirements.
- Run `npm audit` and resolve compatible dependency advisories without using forced downgrades.
