Online Store PWA - Setup Guide
Quick Start
1. Database Setup (Vercel Postgres)
Go to Vercel and sign in
Create a new project or use an existing one
Go to the "Storage" tab
Click "Create Database" → Select "Postgres"
Copy all the environment variables provided
Create a .env.local file in the project root and paste the variables
2. Initialize Database
Once your environment variables are set up:

Start the dev server: bun run dev
Visit: http://localhost:3000/api/init-db
You should see: {"success":true,"message":"Database initialized and seeded"}
This will:

Create all required tables (admins, products, blog_posts)
Seed the admin user (Duncan / @Dmwas001)
Add 6 sample products
Add 3 sample blog posts
3. Access the Application
Customer Side:

Home: http://localhost:3000
Products Gallery: http://localhost:3000/gallery
Blog: http://localhost:3000/blog
Admin Side:

Login: http://localhost:3000/admin/login
Dashboard: http://localhost:3000/admin/dashboard
Credentials: Duncan / @Dmwas001
Features
Customer Features
Browse products with search
View availability status (In Stock / Pre-order)
Call to buy: +254796002379
Read blog posts
PWA support (install on mobile)
Admin Features
Secure login
Add/Edit/Delete products
Manage stock status
Add/Edit/Delete blog posts
Publish/Draft blog posts
Database Schema
admins
id (SERIAL PRIMARY KEY)
username (VARCHAR UNIQUE)
password_hash (VARCHAR)
created_at (TIMESTAMP)
products
id (SERIAL PRIMARY KEY)
name (VARCHAR)
description (TEXT)
price (DECIMAL)
image_url (TEXT)
in_stock (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
blog_posts
id (SERIAL PRIMARY KEY)
title (VARCHAR)
content (TEXT)
tags (TEXT)
published (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
Troubleshooting
Database Connection Issues
Make sure all POSTGRES_* environment variables are set in .env.local
Restart the dev server after adding environment variables
Admin Login Not Working
Ensure the database has been initialized (/api/init-db)
Check credentials: Duncan / @Dmwas001
Clear browser cache and cookies
PWA Not Installing
PWA is disabled in development mode
Deploy to production to test PWA features
Use HTTPS for PWA to work on mobile devices