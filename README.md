<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/5483a1ba-f66a-484a-ab90-e675565cd328/deploy-status)](https://app.netlify.com/sites/newtubes/deploys) -->

# 🚀 NewTube — Tu Plataforma de Video, Reinventada

¡Bienvenido a **NewTube**! Este proyecto es mi laboratorio personal, donde fusiono lo mejor de la tecnología web moderna con mi visión única de cómo debería ser una plataforma de video. Aquí no solo clono YouTube: lo reinvento, lo personalizo y lo hago mío. Cada línea de código, cada decisión de diseño y cada feature están pensados para reflejar mi estilo, creatividad y pasión por el desarrollo.

---

## 🧑‍💻 Sobre el Proyecto

**NewTube** es un clon avanzado de YouTube construido con Next.js 15, TypeScript y Tailwind CSS 4, pero va mucho más allá de un simple clon. Es un entorno de experimentación, aprendizaje y demostración de buenas prácticas, arquitectura modular y experiencia de usuario de alto nivel. Aquí, la innovación y la personalización son la norma.

> "El código es mi arte, la web mi lienzo. Cada pixel y cada línea aquí me representan."

---

## 🏆 Estado Actual

### ✅ Listo y funcionando

- UI ultra moderna y responsiva (Tailwind CSS 4, Radix UI, Lucide)
- SSR y App Router (Next.js 15)
- Autenticación segura (Clerk)
- Sidebar y navegación adaptativa
- Búsqueda optimizada y rápida
- Página principal con filtrado por categorías
- Sistema de categorías dinámico
- API type-safe (tRPC)
- ORM y base de datos (Drizzle ORM + NeonDB)
- Rate limiting y caching (Upstash Redis)
- Componentes reutilizables y arquitectura modular
- Prefetching y data fetching eficiente (React Query)
- Scripts de seed y utilidades para desarrollo

### 🛠️ En desarrollo y próximos pasos

- Subida y procesamiento de videos (cloud storage)
- Perfiles y canales de usuario personalizables
- Recomendaciones de video inteligentes
- Sistema de comentarios en tiempo real
- Playlists, suscripciones y notificaciones
- Historial de visualización y analíticas para creadores
- Testing unitario y E2E (Vitest, Cypress)
- Mejoras de accesibilidad (WCAG)
- Optimización de performance (Lighthouse, bundle splitting)

---

## 🚨 Registro de Usuarios y Subida de Videos (Contexto Actual)

Actualmente, **los registros válidos de usuarios para poder subir videos** se gestionan a través de un webhook temporal en:

```
ngrok http --url=musical-stag-luckily.ngrok-free.app 3000
```

Esto es una solución temporal mientras el proyecto no tenga dominio HTTPS propio. El webhook que almacena los usuarios en la base de datos está apuntando allí. ¡En cuanto tenga dominio y SSL, se actualizará!

---

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15** (App Router, SSR, TypeScript)
- **Tailwind CSS 4** (con animaciones y utilidades personalizadas)
- **Radix UI** (componentes accesibles y modernos)
- **Lucide React** (iconografía)
- **React Hook Form + Zod** (formularios y validación)
- **React Query** (data fetching y caching)
- **Embla Carousel** (sliders y carruseles)
- **clsx, tailwind-merge, class-variance-authority** (utilidades de estilos)

### Backend & API

- **tRPC** (APIs type-safe, fullstack)
- **Drizzle ORM** (PostgreSQL, NeonDB)
- **Upstash Redis** (caching y rate limiting)
- **Clerk** (autenticación y gestión de usuarios)
- **Svix** (webhooks)
- **SuperJSON** (serialización avanzada)

### DevOps & Herramientas

- **Bun** (package manager ultrarrápido)
- **Netlify** (deploy y CI/CD)
- **Turbopack** (fast refresh)
- **Ngrok** (webhooks temporales)
- **ESLint, Prettier** (calidad de código)
- **TypeScript** (tipado estricto)
- **Vitest, Cypress** (testing, próximamente)

---

## 📁 Estructura Moderna del Proyecto

```shell
src/
  app/           # Rutas Next.js (auth, home, studio, api)
  components/    # Componentes UI reutilizables
  db/            # Configuración y esquema de base de datos
  hooks/         # Custom React hooks
  lib/           # Utilidades, configuración de Redis, rate limit, etc.
  middleware.ts  # Middleware global Next.js
  modules/       # Módulos por feature (auth, home, studio, videos, categorías)
  providers/     # Context providers de React
  scripts/       # Scripts utilitarios (seed, etc.)
  trpc/          # Configuración y routers de tRPC
public/          # Assets estáticos
config files     # Configuración (Tailwind, ESLint, Drizzle, etc.)
```

---

## 🚀 Primeros Pasos

1. **Clona el repositorio**
   ```bash
   git clone [URL-del-repo]
   cd Build-youtube-clone-with-nextjs
   ```
2. **Instala dependencias**
   ```bash
   bun install
   # o
   npm install
   ```
3. **Configura variables de entorno**
   Crea un archivo `.env.local` en la raíz con:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
   CLERK_SECRET_KEY=tu_clerk_secret_key
   DATABASE_URL=tu_neondb_url
   UPSTASH_REDIS_REST_URL=tu_redis_url
   UPSTASH_REDIS_REST_TOKEN=tu_redis_token
   ```
4. **Seed de la base de datos**
   ```bash
   bun seed
   # o
   npm run seed
   ```
5. **Ejecuta el servidor de desarrollo**
   ```bash
   bun dev
   # o
   npm run dev
   ```
6. **(Opcional) Ejecuta el webhook temporal**
   ```bash
   bun run dev:all
   # o
   npm run dev:all
   ```
7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧩 Scripts Disponibles

- `bun dev` / `npm run dev` — Modo desarrollo
- `bun run dev:all` — Dev + webhook ngrok
- `bun build` / `npm run build` — Build de producción
- `bun start` / `npm start` — Producción
- `bun lint` / `npm run lint` — Linter
- `bun seed` / `npm run seed` — Seed de categorías

---

## 🏗️ Arquitectura y Filosofía

- **Modularidad total:** Cada feature es un módulo autocontenible.
- **Fullstack type-safe:** tRPC conecta cliente y servidor con tipado extremo.
- **UI accesible y moderna:** Radix UI + Tailwind + animaciones.
- **Performance y escalabilidad:** SSR, caching, prefetching, bundle splitting.
- **Seguridad:** Clerk, validación Zod, rate limiting, CSRF, variables seguras.
- **Personalización:** Todo el código y diseño reflejan mi estilo y visión.

---

## 🤝 Contribuciones

¡Toda contribución es bienvenida! Si quieres aportar, sigue estos pasos:

1. Haz un fork del repo
2. Crea tu rama (`git checkout -b feature/mi-feature`)
3. Haz commit de tus cambios (`git commit -m 'Agrega mi feature'`)
4. Haz push a tu rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

---

## 📜 Licencia

Este proyecto está bajo licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## ✨ Hecho con pasión, café y código por Deus lo vult

> “El código es mi arte, la web mi lienzo. Cada pixel y cada línea aquí me representan.”

---

¿Dudas, sugerencias o quieres contactarme?  
¡Abre un issue o escríbeme directamente!

---

**¡Gracias por visitar NewTube!**  
_Siéntete libre de explorar, aprender y contribuir a este proyecto que es tan único como yo._

---

¿Quieres ver el roadmap, avances o contactarme?  
¡Sígueme en [Deus lo Vult]!

---

¿Listo para el futuro del video?  
**¡Bienvenido a NewTube!**
