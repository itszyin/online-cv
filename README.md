# Zhengqiang Yin — résumé

A static, print-friendly adaptation of [Minimalist CV](https://github.com/BartoszJarocki/cv), served at **https://zqyin.com/**. Built with Next.js, React, Geist and Tailwind. No runtime server is required.

## Content

Edit **`_data/data.yml`**. The original factual résumé remains the single source of truth and is read at build time by `src/lib/resume.ts`. Commented example skills, projects and publications are not displayed. Topic badges repeat terms already present in each role; they do not introduce new qualifications. The original portrait is retained.

The UI preserves the original English text, Chinese name in the profile, dates, roles, bullets, education details, languages, interests and contact destinations. The corrected GitHub account is `itszyin`. Metadata and canonical URLs refer to zqyin.com, not the separate yinzq.me site. No other site is changed.

## Local development and checks

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npm run preview
```

Production preview: http://127.0.0.1:3000. `npm run build` writes the complete static site to `out/`. `npm test` checks both the main and `/print/` pages for all source résumé content, contact links, assets and domain files. The Print / Save PDF button opens the browser's print dialog; use A4 and disable browser headers/footers. `/print/` is retained as a bookmarkable alias using the same print stylesheet.

## GitHub Pages migration — requires publication approval

The existing site uses legacy Jekyll publication from `master` at `/`. This local migration does **not** change that setting.

When publication is approved:

1. Review and merge the redesign through a PR.
2. Coordinate the release with Settings → Pages → Build and deployment → Source: **GitHub Actions**. Do not expect the old branch/Jekyll builder to compile Next.js; switch the source before releasing the new workflow.
3. Keep the existing custom domain **zqyin.com** and HTTPS settings. Both root `CNAME` and exported `public/CNAME` retain it.
4. Run the `Build and deploy résumé` workflow on `master` if necessary. It installs locked dependencies, lints, typechecks, builds, tests the static export and deploys only from `master`. PRs build/test but cannot deploy.
5. Verify the successful Pages deployment and live site, including `/print/` and the GitHub contact link.

`public/.nojekyll` keeps the exported `_next` assets intact. The repository's legacy Jekyll files and assets remain for rollback/history but are not used or shipped by the new build, except the canonical YAML and copied portrait. A rollback requires restoring the previous release and the matching Pages source; do not mix the two build systems.

## Upstream and license

Adapted from Bartosz Jarocki's Minimalist CV at commit `b9c9c2bacf539d6bbab13714fa1c39a1afd0ad08`. Reused its section/card/badge components, social icons, utilities, font setup, Tailwind theme and base CSS, adapting the page to the existing résumé data, static hosting and responsive/print layout. The MIT notice is retained in `LICENSE.minimalist-cv` and in the exported site. Existing third-party licenses remain with legacy assets. No upstream sample résumé facts, analytics or Vercel-specific services are included.
