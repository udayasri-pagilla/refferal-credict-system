🚀 Referral Credit System

A simple and clean Referral + Credit System built with:

Express + TypeScript (Backend)

Next.js + TypeScript + Tailwind (Frontend)

MongoDB (Database)

This project implements secure authentication, referral tracking, first-purchase credit rewards, and a modern dashboard UI.

✨ Features
🔐 Authentication

JWT-based login/register

Password hashing using bcrypt

Protected backend routes

Persistent frontend auth state

👥 Referral System

Unique referral code for each user

Tracks referral lifecycle: pending → converted

First purchase only → +2 credits to referrer & referred

credited flag ensures no double-crediting

Auto-applied referral during signup (?r=REFCODE)

💰 Credits System

New users start with 10 credits

Simulated product purchase deducts credits

Referral bonus awarded only once

📊 Dashboard

Total referred users

Converted users

Total credits earned

Referral link with copy/share

Responsive Tailwind UI

🧑‍💻 How to Clone & Run the Project Locally
0️⃣ Clone the Repository

Anyone can clone the repository using:

git clone https://github.com/udayasri-pagilla/refferal-credict-system
cd https://github.com/udayasri-pagilla/refferal-credict-system

⚙️ Quick Start (Local Development)
Prerequisites

Node.js 16+

npm or yarn

MongoDB (local or Atlas)

1️⃣ Start MongoDB

Example for local:

mongod --dbpath /path/to/db


Or simply use MongoDB Compass / Desktop / Atlas.

2️⃣ Backend Setup
cd backend
cp .env.example .env    # or create manually
npm install
npm run dev


Backend URL:

http://localhost:4000

Backend .env variables:
MONGO_URI=mongodb://localhost:27017/referral_credit
PORT=4000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

3️⃣ Frontend Setup
cd frontend
cp .env.local.example .env.local
npm install
npm run dev


Frontend URL:

http://localhost:3000

Frontend .env.local variables:
NEXT_PUBLIC_API_BASE=http://localhost:4000


This connects the frontend → backend.

🔌 API Summary
Auth APIs
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

Referral APIs
GET /api/referrals/me
GET /api/dashboard

Purchase API
POST /api/purchases

📘 Important Notes

Referral bonus is awarded only once → tracked via credited: true

MVC-style clean code organization

Frontend uses LocalStorage for auth_token + auth_user

Default user credits: 10

No MongoDB transactions required (works with standalone/local DB)

🚀 Deployment

Options include:

Vercel (Frontend)

Render, Railway, or Heroku (Backend)

MongoDB Atlas (Free Tier)

Set the same environment variables in your hosting platform.

🧪 CI / Tests

A GitHub Actions workflow is included that:

Installs dependencies

Builds backend + frontend

Runs type checks

Triggers on push to main.

🎯 Final Notes

This project demonstrates:

A realistic referral + credit workflow

Secure authentication

Safe backend logic preventing double-credit

Clean Next.js UI and UX

Clear documentation so anyone can clone & run your project easily