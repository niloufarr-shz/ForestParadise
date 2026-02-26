🌲 Forest Cabin Reservation Platform

A modern full-stack cabin reservation system built with Next.js App Router.
Users can explore forest cabins, select dates through an interactive calendar, view dynamic pricing, and securely book their stay after authentication.

✨ Live Demo

https://forest-paradise.vercel.app/

🚀 Features

🏕 Browse available forest cabins

📅 Interactive date range selection

💰 Dynamic price calculation based on stay duration

🔐 Authentication required before booking

👤 User account dashboard

✏️ Edit and manage reservations

📱 Fully responsive UI

⚡ Optimized rendering (SSR + CSR)

🛠 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Context API (State Management)

Authentication

Auth.js (NextAuth – latest version)

Backend & Database

Supabase

Date Selection

React Day Picker (for booking calendar)

Rendering Strategy

Server-Side Rendering (SSR)

Client-Side Rendering (CSR)

Server Actions

Deployment

Vercel

🧠 Architecture Overview

This project leverages the Next.js App Router architecture:

Server Components

Data fetching

Secure server logic

Database operations

Client Components

Interactive calendar

Booking forms

UI state handling

Protected Routes

Booking requires authentication

Session management handled via Auth.js

Database

Cabin data

Booking records

User-related information stored in Supabase

🔐 Authentication Flow

User selects desired cabin and dates

If not authenticated → redirected to login

After login → user can complete reservation

Session is maintained securely via Auth.js

📦 Installation
# Clone repository
git clone https://github.com/your-username/your-repo-name.git

# Install dependencies
npm install

# Run development server
npm run dev
⚙️ Environment Variables

Create a .env.local file:

NEXTAUTH_SECRET=
NEXTAUTH_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
📌 What This Project Demonstrates

Advanced Next.js App Router patterns

SSR vs CSR practical implementation

Secure authentication flow

Full-stack integration with Supabase

Server Actions usage

Context API state management

Clean component architecture

Production deployment with Vercel

👩‍💻 Author


