🚀 Quick Setup Instructions
⚡ You're Almost There!
Your online store PWA is built and running. Here's what you need to do to complete the setup:

Step 1: Set Up Free PostgreSQL Database
Option A: Vercel Postgres (Recommended - Easy & Free)
Go to Vercel: https://vercel.com
Sign in or create a free account
Create a project (or use existing)
Navigate to Storage tab
Click "Create Database"
Select "Postgres"
Copy all environment variables shown
Option B: Supabase (Alternative - Also Free)
Go to https://supabase.com
Create a new project
Get connection string from Settings > Database
Step 2: Create Environment Variables File
Create a file named .env.local in the online-store-pwa directory
Paste this template and fill in your database credentials:
# From Vercel Postgres or Supabase

POSTGRES_URL=your-postgres-url-here

POSTGRES_PRISMA_URL=your-prisma-url-here

POSTGRES_URL_NON_POOLING=your-non-pooling-url-here

POSTGRES_USER=your-username-here

POSTGRES_HOST=your-host-here

POSTGRES_PASSWORD=your-password-here

POSTGRES_DATABASE=your-database-name-here


# Auth Secret (generate random string or use this for dev)

AUTH_SECRET=super-secret-key-change-me-in-production-12345

AUTH_URL=http://localhost:3000
Step 3: Initialize the Database
Make sure the dev server is running (it should already be)

cd online-store-pwa

bun run dev
Open your browser and visit:

http://localhost:3000/api/init-db
You should see:

{"success":true,"message":"Database initialized and seeded"}
This will:

✅ Create all database tables
✅ Add sample products (6 items)
✅ Add sample blog posts (3 posts)
✅ Create admin user (Duncan / @Dmwas001)
Step 4: Test Everything!
Customer Pages:
Home: http://localhost:3000
Products: http://localhost:3000/gallery
Blog: http://localhost:3000/blog
Admin Dashboard:
Login: http://localhost:3000/admin/login
Username: Duncan
Password: @Dmwas001
Dashboard: http://localhost:3000/admin/dashboard
🎉 You're Done!
The store is now fully functional with:

✅ 6 sample products ready to browse
✅ Product search functionality
✅ 3 sample blog posts
✅ Admin dashboard for managing everything
✅ PWA support (install on mobile)
✅ Click-to-call with your phone number (+254796002379)
🔄 Next Steps
Customize Products: Login to admin and update products with your own
Write Blog Posts: Share updates with your customers
Change Phone Number: Search for +254796002379 and replace
Customize Styling: Edit components in src/components/ui/
Update Branding: Change store name, colors, and logo
📚 Documentation
Full Setup Guide: .same/setup-guide.md
Customer Manual: .same/customer-manual.md
Admin Manual: .same/admin-manual.md
Main README: README.md
⚠️ Troubleshooting
Database connection fails?

Check that all POSTGRES_* variables are set correctly
Restart dev server after adding .env.local
Can't login as admin?

Make sure you visited /api/init-db first
Use exact credentials: Duncan / @Dmwas001
Images not loading?

Sample products use Unsplash images (requires internet)
Replace with your own image URLs in admin
🆘 Need Help?
Check the troubleshooting sections in:

README.md
.same/setup-guide.md
Happy selling! 🛍️