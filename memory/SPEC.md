# André Fleischfresser Portfolio

## What it does

Single-page personal portfolio for André Gustavo Reitz Fleischfresser. It presents a project-first progression from robotics and embedded systems through backend engineering and professional iOS automation to native iOS product experimentation.

## Key flows

- Header navigation scrolls to Overview, Gap, Projects, Experience and Contact sections.
- Hero CTAs link to the flagship Gap section and André's public GitHub/LinkedIn profiles.
- Gap is the visual centerpiece with three interactive iPhone screenshot slots using the supplied real app screens in this order: Home / START WITH TIME, Tasks / SMART RECOMMENDATION, and New Task / CONTEXT & PRIORITY. The screenshots render without artificial notch or status-bar chrome; only a subtle outer frame remains. The Tasks screen is central and visually prominent, with an in-page case-study expansion.
- Gap screenshot frames derive their height from each original image rather than a fixed frame ratio; images use `object-fit: contain`, automatic height, visible overflow, and no pixel alteration so the full iOS screen remains visible.
- A concise More than projects. milestones section sits between How I build and Currently exploring, covering robotics mentoring/OBR results and academic performance at PUCPR.
- The portfolio's connective narrative is learning by building: small trajectory copy, project learning dimensions, a reflective How I build paragraph, and a continuation note in Currently exploring connect experimentation, engineering, reliability and product thinking without adding a timeline.
- Motion is lightweight and editorial: viewport reveals, drawing rules, sequenced Gap phones, active navigation markers, semantic project hover states, and one cursor-reactive hero line. How I build is the primary interaction, with scroll/tap-activated stages, a progressing connector, and carry-forward reflections. All motion respects `prefers-reduced-motion` and content remains visible before JavaScript initializes.
- The hero-to-Gap thread is a compact editorial bridge. Other Projects uses three divided editorial columns on desktop and stacked rows on mobile. Currently exploring groups the existing interests into Native iOS & Product, Software Architecture, and Quality & Reliability.
- English is the default language. A discreet EN/PT header switch translates all interface and editorial copy into natural Brazilian Portuguese while preserving project names and technology names; the mobile navigation includes the same control. The selection is intentionally session-only and also updates the document language, title, and meta description.
- Project repository links open the supplied GitHub repositories in a new tab.
- Contact includes mailto, GitHub, LinkedIn and a copy-email button with a toast confirmation.
- Mobile navigation collapses into a menu for iPhone-sized screens.

## Data model and backend

The portfolio is currently content-driven and does not require application data or authentication. The pre-existing FastAPI `/api` status route remains available for platform smoke checks.

## Auth roles

None. This is a public portfolio.

## Content constraints

Use concise, supplied project and experience copy. Gap is a native iOS project by André. Elder-Watch and PromoSearch are collaborative university projects at PUCPR. The site does not use Apple logos, Apple branding or imply official affiliation.