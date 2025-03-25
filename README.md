<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/5483a1ba-f66a-484a-ab90-e675565cd328/deploy-status)](https://app.netlify.com/sites/newtubes/deploys) -->

# NewTube - YouTube Clone

A modern, feature-rich YouTube clone built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates the implementation of a video-sharing platform with a focus on user experience and performance.

## 🚀 Features

### Implemented
- ✅ **Modern and responsive UI** using Tailwind CSS with mobile-first approach
- ✅ **Server-side rendering** with Next.js 15 and App Router
- ✅ **Authentication system** using Clerk for secure user management
- ✅ **Navigation sidebar** with responsive design for different screen sizes
- ✅ **Search functionality** with optimized performance
- ✅ **Home page layout** with category filtering
- ✅ **Radix UI components** integration for accessible UI elements
- ✅ **Categories system** with filtering capabilities
- ✅ **tRPC integration** for type-safe API calls between client and server
- ✅ **Database integration** with Drizzle ORM and NeonDB

### Planned
- 📝 **Video upload and processing** with cloud storage integration
- 📝 **User profiles and channels** with customization options
- 📝 **Video recommendations** based on user preferences
- 📝 **Comments and interactions** with real-time updates
- 📝 **Playlists management** for organizing content
- 📝 **Watch history** tracking for personalized experience
- 📝 **Subscriptions** system for following creators
- 📝 **Video analytics** for content creators
- 📝 **Advanced search** with filters and sorting options
- 📝 **Notifications system** for user engagement

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 with TypeScript and App Router
- **Styling:** Tailwind CSS 4 with custom components
- **UI Components:** Radix UI (comprehensive suite of accessible components)
- **Form Handling:** React Hook Form with Zod validation
- **State Management:** React Query with tRPC
- **Client Utilities:**
  - date-fns for date formatting
  - clsx and tailwind-merge for conditional styling
  - Lucide React for icons
  - Embla Carousel for slider components

### Backend
- **API Layer:** tRPC for end-to-end typesafe APIs
- **Authentication:** Clerk for user management
- **Database:** Drizzle ORM with NeonDB (PostgreSQL)
- **Caching:** Upstash Redis
- **Rate Limiting:** Upstash Rate Limit

### DevOps
- **Package Manager:** Bun (with npm compatibility)
- **Deployment:** Netlify with continuous integration
- **Development Tools:** Turbopack for fast refresh

## 📦 Project Structure

```
├── src/
│   ├── app/                # Next.js app directory with App Router
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (home)/         # Home page routes
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout component
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   └── filter-carousel.tsx # Category filter component
│   ├── db/                 # Database configuration
│   │   ├── index.ts        # Database connection
│   │   └── schema.ts       # Database schema
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   │   ├── ratelimit.ts    # Rate limiting configuration
│   │   ├── redis.ts        # Redis configuration
│   │   └── utils.ts        # Utility functions
│   ├── middleware.ts       # Next.js middleware
│   ├── modules/            # Feature-based modules
│   │   ├── auth/           # Authentication module
│   │   ├── categories/     # Categories module
│   │   └── home/           # Home page module
│   ├── providers/          # React context providers
│   ├── scripts/            # Utility scripts
│   │   └── seed-categories.ts # Database seeding
│   └── trpc/               # tRPC configuration
│       ├── client.tsx      # Client-side tRPC setup
│       ├── init.ts         # tRPC initialization
│       ├── query-client.ts # React Query client
│       ├── routers/        # tRPC routers
│       └── server.tsx      # Server-side tRPC setup
├── public/                 # Static assets
└── config files            # Various configuration files
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd youtube-clone
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Database
   DATABASE_URL=your_neondb_connection_string
   
   # Redis
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Seed the database**
   ```bash
   bun seed
   # or
   npm run seed
   ```

5. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Available Scripts

- **Development Mode:** `bun dev` or `npm run dev`
- **Development with Webhook:** `bun run dev:all` (runs both dev server and ngrok webhook)
- **Build:** `bun build` or `npm run build`
- **Production:** `bun start` or `npm start`
- **Linting:** `bun lint` or `npm run lint`
- **Database Seeding:** `bun seed` or `npm run seed`

### Architecture

The project follows a modular architecture with feature-based organization:

- **App Router:** Utilizes Next.js 15 App Router for page routing
- **tRPC:** Provides type-safe API communication between client and server
- **Modules:** Features are organized into self-contained modules
- **Components:** Reusable UI components built with Radix UI and Tailwind

## 🎯 Project Goals

1. Create a modern and performant video-sharing platform
2. Implement industry best practices for scalability
3. Provide a seamless user experience across devices
4. Demonstrate advanced Next.js and React patterns
5. Build a fully accessible application following WCAG guidelines
6. Optimize for performance with efficient data fetching and rendering

## 🧪 Testing

- Unit testing implementation planned with Vitest
- E2E testing with Cypress planned
- Component testing with React Testing Library planned
- Performance testing with Lighthouse planned

## 📱 Responsive Design

- Mobile-first approach with adaptive layouts
- Responsive navigation with collapsible sidebar
- Adaptive video player for different screen sizes
- Cross-browser compatibility testing
- Touch-friendly interactions for mobile devices

## 🔐 Security

- Authentication with Clerk for secure user management
- Protected API routes with proper authorization
- Input validation with Zod schema validation
- CSRF protection for form submissions
- Rate limiting with Upstash Rate Limit
- Secure environment variable handling

## 🌐 Performance Optimization

- Server-side rendering for improved initial load
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient data fetching with React Query
- Caching strategies with Redis
- Bundle size optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Next.js and TypeScript