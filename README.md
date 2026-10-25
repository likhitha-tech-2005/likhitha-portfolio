# Likhitha Bandaru Portfolio

A premium, cinematic portfolio for a Software Engineer focused on Data & AI, built with Next.js and TypeScript.

## Overview

This portfolio is designed to help recruiters quickly understand:
- who Likhitha Bandaru is
- the technical areas she targets: Python, SQL, data engineering, generative AI, governance, and MLOps
- the projects she has built
- her education and certification background
- how to contact her and download her resume

## Requirements

Install Node.js 18+ or later.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Replace the profile photo and resume

- Profile photo: place your final image in `public/likhitha-profile.jpg`
- Resume PDF: place the final resume in `public/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf`

If you do not yet have a photo or resume, keep the current placeholders and replace them later.

## Edit portfolio content

The main content is kept in:

- `src/data/portfolio.ts` for personal details, social links, skills, and project descriptions
- `src/components/portfolio-home.tsx` for the page sections and UI behavior
- `src/app/globals.css` for styling and visual polish

## GitHub Pages deployment

This project is configured for static export to support GitHub Pages.

1. Create a GitHub repository:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2. Add the GitHub Pages workflow file in `.github/workflows/deploy.yml`.
3. In GitHub, open the repository and go to Settings → Pages.
4. Set the branch to `gh-pages` and deploy from the GitHub Actions workflow.
5. After the workflow runs, your site will be available at:

`https://<your-username>.github.io/<your-repo>/`

## Verify live URLs

Check these before publishing:
- GitHub repository link in `src/data/portfolio.ts`
- LinkedIn profile link in `src/data/portfolio.ts`
- Resume file exists at `public/Likhitha_Bandaru_Resume_IBM_Data_AI.pdf`
- Photo file exists at `public/likhitha-profile.jpg`

## Notes

- The portfolio intentionally avoids fake claims, inflated metrics, and fabricated job experience.
- Project links remain intentionally generic unless verified public URLs are available.
- The site keeps all interactive controls functional without server-side APIs or secret keys.
