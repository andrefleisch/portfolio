# André Fleischfresser — Portfolio

Bilingual personal portfolio presenting my projects, professional experience, current interests and product work.

## Highlights

- English and Portuguese content
- Responsive editorial layout
- Gap product case study
- Selected software, automation and embedded-systems projects
- Accessible navigation and interactive elements

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons
- Sonner notifications

## Running locally

```bash
cd frontend
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Production build

```bash
cd frontend
npm run build
```

The generated files are written to `frontend/dist`.

## Project structure

```text
frontend/
├── public/                  Static icons and favicons
├── src/
│   ├── components/ui/      Shared interface components
│   ├── content/            English and Portuguese copy
│   ├── lib/                Local icon compatibility layer
│   ├── pages/              Portfolio page
│   ├── App.tsx             Application component
│   ├── index.css           Design tokens and global styles
│   └── main.tsx            Application entry point
├── index.html
├── package.json
└── vite.config.ts
```
