# Chaudrel Rénovation — Site Vercel

Site landing page pour **Chaudrel Rénovation** (Bruxelles), prêt pour déploiement Vercel.

## Stack

- Vite 6 + React 18
- Tailwind CSS 3
- Framer Motion (animations)
- React Router (navigation SPA)

## Déploiement

### Option 1 — Via Git (recommandé)

1. Pousse le contenu de ce dossier sur un repo GitHub
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Importe le repo
4. Vercel détecte automatiquement Vite. Ne change rien.
5. Clique **Deploy**

### Option 2 — Via CLI Vercel

```bash
npm install -g vercel
cd chaudrel-vercel
npm install
vercel --prod
```

## Structure

```
chaudrel-vercel/
├── public/
│   ├── favicon.svg
│   └── images/             logo + photos avant/après
├── src/
│   ├── components/         Navbar, Hero, Footer, etc.
│   ├── pages/              Home
│   ├── lib/                AuthContext, utils
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json             SPA rewrites + cache long
└── README.md
```

## Notes

- **SPA** : `vercel.json` redirige toutes les URLs vers `index.html` (évite les 404 sur refresh).
- **Cache** : les assets bundlés (`/assets/*`) et les images (`/images/*`) sont mis en cache 1 an.
- **Aucun secret requis** — pas de variables d'environnement, pas de backend.
- `base: './'` dans `vite.config.js` rend tous les chemins d'assets relatifs, ce qui évite les 404 si tu déploies sur un sous-chemin.
