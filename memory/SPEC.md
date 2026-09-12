# André Fleischfresser Portfolio

## What it does

Single-page personal portfolio for André Gustavo Reitz Fleischfresser. It presents a project-first progression from robotics and embedded systems through backend engineering and professional iOS automation to native iOS product experimentation.

## Key flows

- Header navigation scrolls to Overview, Gap, Projects, Experience and Contact sections.
- Hero CTAs link to the flagship Gap section and André's public GitHub/LinkedIn profiles.
- Gap is the visual centerpiece with three interactive, replacement-ready iPhone screenshot placeholders and an in-page case-study expansion.
- Project repository links open the supplied GitHub repositories in a new tab.
- Contact includes mailto, GitHub, LinkedIn and a copy-email button with a toast confirmation.
- Mobile navigation collapses into a menu for iPhone-sized screens.

## Data model and backend

The portfolio is currently content-driven and does not require application data or authentication. The pre-existing FastAPI `/api` status route remains available for platform smoke checks.

## Auth roles

None. This is a public portfolio.

## Content constraints

Use concise, supplied project and experience copy. Gap is a native iOS project by André. Elder-Watch and PromoSearch are collaborative university projects at PUCPR. The site does not use Apple logos, Apple branding or imply official affiliation.