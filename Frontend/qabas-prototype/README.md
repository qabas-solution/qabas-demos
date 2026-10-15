# QABAS marketing site

Vite, React, TypeScript, Tailwind CSS v4, and SCSS power the bilingual QABAS site.

## Hero scenes

Home scenes live in `src/features/home/scenes/<scene-id>/` and are loaded through
`scenes/registry.ts`. Add a typed scene component and SCSS module, extend
`sceneIds`, then register the lazy import. Preview any scene with
`?scene=<scene-id>`. Lite mode and reduced-motion preferences freeze decorative
motion.

## Site configuration

`site-config.schema.ts` is the versioned Zod contract.
`default-site-config.ts` preserves the public default. At runtime the service
loads the default, an optional validated `VITE_CONFIG_URL`, then validated local
overrides. `BroadcastChannel` synchronizes the public preview and studio.

The hidden studio defaults to `q7-vault-9k`; set `VITE_STUDIO_PATH` before
deployment. `VITE_STUDIO_KEY` accepts the lowercase SHA-256 digest of the
passcode and unlocks for the browser session. This client-side check provides
obscurity, not real security. Protect authoring at the network or identity layer.

Use Export to copy or download validated JSON. Review it, replace the default
configuration in source, run verification, and commit the reviewed change.

## Contact form setup

1. In EmailJS, create a Gmail service.
2. Create a template with **To Email** `{{to_email}}`, **Reply To** `{{reply_to}}`,
   **From Name** `{{from_name}}`, and Subject `[Qabas] {{subject}} — {{from_name}}`.
   Use the body in [docs/emailjs-template.txt](docs/emailjs-template.txt).
3. Copy the service ID, template ID, and Public Key into `.env` using
   `.env.example`.
4. Add the deployed site origins to EmailJS allowed origins.
5. Test the contact form in the public site and use the studio test action after
   the credentials are configured. Confirm success, retry behavior, and the
   direct-email fallback when credentials are absent.

## Commands

```sh
pnpm exec tsc -b
pnpm build
pnpm format
node scripts/verify/config.mjs
```
