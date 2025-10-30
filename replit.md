# Online Store PWA - Replit Setup

## Project Overview
This is a Next.js-based Progressive Web App (PWA) for an online store, originally developed and now integrated with Replit's PostgreSQL database.

**Repository**: https://github.com/Duncan765/online-store-pwa.git

## Recent Changes (October 30, 2025)

### Database Integration
- **Connected to Replit PostgreSQL**: Updated `src/lib/db.ts` to use Replit's `DATABASE_URL` environment variable
- **Database Configuration**: The app now automatically uses Replit's PostgreSQL database (DATABASE_URL) or falls back to Vercel's POSTGRES_URL
- **Environment Variables**: Created `.env.local` with AUTH_SECRET configuration

### Repository Setup
- **Cloned Repository**: Successfully pulled from GitHub
- **Pushed Updates**: All database integration changes have been committed and pushed back to GitHub
- **Commit SHA**: 6f71628b40170ff402462d4b076e0d8e4e74fa6c

## Project Structure

### Frontend (Next.js App Directory)
- `src/app/` - Next.js app router pages
  - `page.tsx` - Homepage
  - `blog/page.tsx` - Blog listing page
  - `admin/login/page.tsx` - Admin login
  - `admin/dashboard/page.tsx` - Admin dashboard
- `src/components/` - React components
  - `ui/` - Shadcn UI components
  - `navigation.tsx` - Site navigation

### Backend (API Routes)
- `src/app/api/init-db/route.ts` - Database initialization and seeding
- `src/app/api/products/route.ts` - Products CRUD operations
- `src/app/api/blog/route.ts` - Blog posts CRUD operations
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth authentication

### Database
- **Tables**:
  - `admins` - Admin users (username, password_hash)
  - `products` - Products catalog (name, description, price, image_url, in_stock)
  - `blog_posts` - Blog content (title, content, tags, published)

### Configuration
- `src/lib/db.ts` - Database connection with @vercel/postgres
- `src/lib/auth.ts` - NextAuth configuration
- `src/lib/seed.ts` - Database seed data
- `.env.local` - Environment variables (DATABASE_URL, AUTH_SECRET)

## Running the Application

### Development Server
The app runs on **port 5000** as configured in `.replit`:
```bash
npm run dev
```

### First-Time Setup
1. **Initialize Database**: Visit `/api/init-db` to create tables and seed data
2. **Admin Credentials**:
   - Username: Duncan
   - Password: @Dmwas001

### Key URLs
- Homepage: `/`
- Blog: `/blog`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`
- Database Init: `/api/init-db`

## Technology Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Database**: PostgreSQL (Replit-hosted)
- **Database Client**: @vercel/postgres
- **Authentication**: NextAuth 5.0
- **UI Components**: Shadcn UI with Radix UI primitives
- **Styling**: Tailwind CSS
- **PWA**: next-pwa for Progressive Web App functionality

## Environment Variables
Required environment variables (configured in Replit):
- `DATABASE_URL` - PostgreSQL connection string (automatically provided by Replit)
- `AUTH_SECRET` - NextAuth secret key (configured in .env.local)
- `AUTH_URL` - Application URL (defaults to localhost:3000)

## Database Connection
The `src/lib/db.ts` file has been updated to:
1. First check for Replit's `DATABASE_URL`
2. Fall back to `POSTGRES_URL` if running on Vercel
3. Create a connection pool using @vercel/postgres
4. Export a `sql` tagged template for queries

## Next Steps
1. Visit `/api/init-db` to initialize the database
2. Test the application functionality
3. Customize products and blog content via admin dashboard
4. Update branding and styling as needed

## Deployment
The app is configured for:
- **Development**: Runs on port 5000 via `npm run dev`
- **Production**: Builds with `npm run build` and starts with `npm run start`
- **Replit Deployment**: Configured in `.replit` with autoscale deployment target
