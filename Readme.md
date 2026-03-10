# Temi & Co. Estates

A full-stack real estate platform built for the Nigerian property market.
Live demo built to showcase modern property listings for Lagos and Abuja.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
**Auth:** JWT Authentication
**Deployment:** Vercel (frontend) + Render (backend)

## Features

- Browse property listings with filters (sale, rent, shortlet)
- Property detail pages with image gallery and booking system
- Book property inspections (saved to database)
- Contact form (saved to database)
- Admin dashboard to manage listings and bookings
- JWT-protected admin panel

## Pages

- `/` — Homepage with featured listings
- `/listings` — All properties with search and filters
- `/listings/:id` — Property detail with booking modal
- `/contact` — Contact form
- `/admin` — Admin login
- `/admin/dashboard` — Admin overview
- `/admin/properties` — Manage listings
- `/admin/bookings` — Manage bookings

## Getting Started

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd estate
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the `server/` folder:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Admin Access
Navigate to `/admin` to access the dashboard.

## Contact
Built by Temiloluwa Aderounmu
- Email: aderounmutemiloluwa2004@gmail.com
- Phone: 09016196558