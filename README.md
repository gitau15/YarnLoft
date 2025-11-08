# YarnLoft - The Global Hub for the Fiber Arts Community

YarnLoft is a comprehensive digital platform for knitters and crocheters that combines a curated marketplace, powerful creative tools, and a vibrant community. Our mission is to become the indispensable daily companion for every fiber artist.

## 🧶 Phase 1 Features

- **E-Commerce Platform**: Curated yarn catalog with secure payments (Stripe & M-Pesa)
- **Stash Manager**: Personal yarn inventory tracking with photos
- **Community Features**: Pattern library and project gallery
- **User Profiles**: Customizable profiles with crafting preferences
- **Mobile-First Design**: Optimized for all devices

## 🏗️ Architecture

This is a monorepo using the following structure:

```
YarnLoft/
├── apps/
│   ├── web/           # Next.js frontend application
│   └── api/           # Express.js backend API
├── packages/
│   ├── shared/        # Shared TypeScript types
│   ├── ui/            # Component library
│   └── db/            # Database schema and Prisma client
├── docs/              # Documentation
└── tools/             # Development tools
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Set Up Database**
   ```bash
   cd packages/db
   npm run db:push
   npm run db:seed
   ```

4. **Start Development Servers**
   ```bash
   # Start the backend API
   npm run dev:api

   # Start the frontend (in a new terminal)
   npm run dev:web
   ```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Auth.js (Google, Email/Password)
- **Payments**: Stripe, Daraja (M-Pesa)
- **File Storage**: Cloudflare R2
- **Deployment**: Vercel (Frontend), Railway (Backend)

## 📱 Access

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **Database**: PostgreSQL (local or managed)

## 🧪 Development

- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Type Safety**: TypeScript (strict mode)
- **Database**: Prisma with migrations

## 📜 License

MIT License - see LICENSE file for details.