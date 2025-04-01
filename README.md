# dance-booking-app
Booking system

# Dance Booking App

This is a dance class booking application built with Node.js, Express, Mustache, and NeDB. It allows users to view and book dance classes and workshops, and provides an admin panel for managing users, bookings, classes, and workshops.

## How to Run

1. Clone the repository:
git clone https://github.com/Grygas93/dance-booking-app.git

2. Install dependencies:
nmp install

3. Start the server:
node server.js

4. Open your browser and go to:
http://localhost:3000

## Admin Login

- Email: `admin@danceapp.com`
- Password: `admin123`

> This default admin account cannot be edited or deleted.

## Organiser Login

- Email: `organiser@danceapp.com`
- Password: `Organiser123@`

## Features

- Public site:
- View weekly dance classes by day
- View workshops and book places
- Mobile-responsive layout

Admin panel:
- Login & logout
- Admin and organiser roles
- Access to full dashboard
- Manage users (admins only)
- Manage weekly classes & workshops
- View and delete class & workshops bookings
- Password validation & hashing (bcrypt)
- Session-based access control

Organiser panel:
- Login & logout
- Access to organiser dashboard
- Manage weekly classes & workshops
- View and delete class & workshop bookings


## Security

- Role-based access (admin vs organiser)
- Password hashing using `bcrypt`
- Password validation (min. 8 characters)
- Default admin protection (cannot delete or modify)

## Live Site

This app is hosted on a free Railway or Render server, which may go to sleep when inactive.  
Please allow a few seconds for the app to wake up and load properly.

-  [View on Railway](https://dancebookingapp-production.up.railway.app)  
-  [View on Render](https://dance-booking-app.onrender.com)

## Documentation

- [Test Report (PDF)](./Test%20Report%20Anna%20Grygas.pdf)
