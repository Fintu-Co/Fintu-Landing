# fintu-landing

Landing pública de **Fintú & Co.** (React 19 + Vite), desplegada en Cloudflare Pages.

Los botones de "Iniciar sesión" y "Comenzar" llevan a la app, cuya URL se define en `VITE_APP_URL`.

## Correrlo en local

```bash
cp .env.example .env
npm install
npm run dev     # http://localhost:5174
npm run build
```

## Despliegue (Cloudflare Pages)

```
Build command:    npm run build
Output directory: dist
Variables:        VITE_APP_URL=https://fintu-app.pages.dev
```

`VITE_APP_URL` se inyecta en build: si cambia, hay que redesplegar.
