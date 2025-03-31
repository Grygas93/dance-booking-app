const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const app = express();
const PORT = 3000;

//Models (databases)
const classDB = require('./models/classes');
const bookingDB = require('./models/bookings');
const workshopDB = require('./models/workshops');
const workshopBookingDB = require('./models/workshop-bookings');

//Routes
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

//Session
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

//Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Static files and forms
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', publicRoutes);
app.use('/', adminRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
