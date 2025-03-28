const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// MODELS (databases)
const classDB = require('./models/classes');
const bookingDB = require('./models/bookings');
const workshopDB = require('./models/workshops');
const workshopBookingDB = require('./models/workshop-bookings');

// ROUTES
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

// SESSION 
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// MUSTACHE 
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// STATIC FILES & FORMS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/', publicRoutes);
app.use('/', adminRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
