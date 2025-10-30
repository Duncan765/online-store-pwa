🛍️ Online Store PWA
A modern Progressive Web App for an online store with admin dashboard. Built with Next.js, PostgreSQL, and NextAuth.

✨ Features
Customer Features
🏠 Beautiful home page with call-to-action
🔍 Product gallery with keyword search
📱 Click-to-call functionality (+254796002379)
📝 Blog section for updates and news
📲 PWA support - install on mobile devices
🎨 Clean, minimalist design inspired by testdouble.com
📱 Fully responsive - works on all devices
Admin Features
🔐 Secure login for administrators
➕ Add, edit, and delete products
📦 Manage product stock status
✍️ Create and manage blog posts
📊 Dashboard overview of all content
🏷️ Tag blog posts for organization
🚀 Quick Start
Prerequisites
Bun installed (or Node.js)
A Vercel account (for free PostgreSQL database)
1. Clone and Install
cd online-store-pwa

bun install
2. Set Up Database
Get Free PostgreSQL from Vercel:

Go to Vercel and sign in
Create a new project (or use existing)
Go to Storage tab → Create Database → Select "Postgres"
Copy all the environment variables
Create .env.local file:

# Copy from Vercel Postgres dashboard

POSTGRES_URL=

POSTGRES_PRISMA_URL=

POSTGRES_URL_NON_POOLING=

POSTGRES_USER=

POSTGRES_HOST=

POSTGRES_PASSWORD=

POSTGRES_DATABASE=


# Generate a random secret (or use this for dev)

AUTH_SECRET=your-super-secret-key-change-in-production

AUTH_URL=http://localhost:3000
3. Initialize Database
Start the dev server:

bun run dev
Visit this URL to create tables and seed data:

http://localhost:3000/api/init-db
You should see: {"success":true,"message":"Database initialized and seeded"}

4. Access the Application
Customer Side:

Home: http://localhost:3000
Products: http://localhost:3000/gallery
Blog: http://localhost:3000/blog
Admin Side:

Login: http://localhost:3000/admin/login
Credentials:
Username: Duncan
Password: @Dmwas001
📖 Documentation
Detailed manuals are available in the .same folder:

Setup Guide - Complete setup instructions
Customer Manual - How customers use the store
Admin Manual - Managing products and blog
🗄️ Database Schema
Products Table
Product name, description, price
Image URL
Stock status (In Stock / Out of Stock)
Created/updated timestamps
Blog Posts Table
Title, content, tags
Published/draft status
Created/updated timestamps
Admins Table
Username (unique)
Hashed password
Created timestamp
🛠️ Tech Stack
Framework: Next.js 14 (App Router)
Database: PostgreSQL (Vercel Postgres)
Authentication: NextAuth v5
Styling: Tailwind CSS + shadcn/ui
PWA: next-pwa
Runtime: Bun (or Node.js)
📱 PWA Installation
Mobile Users
iOS (iPhone/iPad):

Open the website in Safari
Tap the Share button
Tap "Add to Home Screen"
Tap "Add"
Android:

Open the website in Chrome
Tap the menu (⋮)
Tap "Add to Home screen"
Tap "Add"
Desktop Users
When visiting the site, look for the install icon in the address bar and click it.

🎨 Customization
Change Phone Number
Edit the phone number in these files:

src/app/page.tsx
src/app/gallery/page.tsx
Search for +254796002379 and replace with your number.

Update Branding
Store Name: Edit src/components/navigation.tsx
Colors: Update tailwind.config.ts
Logo: Replace icons in public/ folder
Metadata: Edit src/app/layout.tsx
Add Custom Styling
The shadcn/ui components are in src/components/ui/. Customize them to match your brand:

button.tsx - Button styles
input.tsx - Input fields
card.tsx - Card components
🔐 Security
Change Admin Password
Option 1: Through Database

UPDATE admins

SET password_hash = '$2a$10$...'

WHERE username = 'Duncan';
Option 2: Add New Admin

Modify src/lib/seed.ts with your credentials and run the seed again.

Production Checklist
 Change AUTH_SECRET to a random string
 Update AUTH_URL to your production domain
 Use environment variables for sensitive data
 Enable HTTPS for PWA features
 Change default admin password
🚀 Deployment
Deploy to Vercel
Push code to GitHub
Import project in Vercel
Add environment variables
Deploy!
Visit /api/init-db on production URL to initialize database
Deploy to Netlify
The project includes a netlify.toml configuration file.

Connect repository to Netlify
Add environment variables
Deploy!
Visit /api/init-db to initialize
🐛 Troubleshooting
"Cannot find type definition file for 'minimatch'"
This is a TypeScript warning and won't affect functionality. To fix:

bun add -d @types/minimatch
Database Connection Failed
Verify all POSTGRES_* variables in .env.local
Check Vercel Postgres dashboard for correct credentials
Restart the dev server after adding env variables
Admin Login Not Working
Ensure database is initialized (/api/init-db)
Check browser console for errors
Verify credentials: Duncan / @Dmwas001
Clear browser cookies and try again
Images Not Loading
Ensure image URLs are valid and accessible
Check next.config.js for allowed image domains
Use Unsplash URLs: https://images.unsplash.com/photo-ID?w=800
📞 Support
For issues or questions:

Check the documentation in .same/ folder
Review troubleshooting section above
Check browser console for error messages
Verify environment variables are set correctly
📝 License
This project is created for demonstration purposes. Feel free to use and modify as needed.

Built with ❤️ using Next.js and Same.new