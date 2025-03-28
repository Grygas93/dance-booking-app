const classDB = require('../models/classes');
const workshopDB = require('../models/workshops');
const bookingDB = require('../models/bookings');
const workshopBookingDB = require('../models/workshop-bookings');

// Show homepage
exports.home = (req, res) => {
  res.render('home');
};

// Show weekly classes, grouped by day
exports.showClasses = (req, res) => {
  classDB.find({}, (err, classes) => {
    if (err) return res.status(500).send('Error reading classes.');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupedClasses = days.map(day => ({
      day,
      classes: classes.filter(cls => cls.day === day)
    }));

    res.render('classes', { days: groupedClasses });
  });
};

// Show class details
exports.classDetails = (req, res) => {
  classDB.findOne({ _id: req.params.id }, (err, classData) => {
    if (!classData) return res.status(404).send('Class not found');
    res.render('class-details', { class: classData });
  });
};

// Book a class
exports.bookClass = (req, res) => {
  const { classId, name, email } = req.body;
  const booking = {
    classId,
    name,
    email,
    date: new Date().toISOString()
  };

  bookingDB.insert(booking, (err) => {
    if (err) return res.status(500).send('Booking failed.');
    res.render('booking-confirmation', { name });
  });
};

// Show all workshops
exports.showWorkshops = (req, res) => {
  workshopDB.find({}, (err, workshops) => {
    if (err) return res.status(500).send("Error loading workshops.");
    res.render('workshops', { workshops });
  });
};

// Show workshop details
exports.workshopDetails = (req, res) => {
  workshopDB.findOne({ _id: req.params.id }, (err, workshop) => {
    if (!workshop) return res.status(404).send('Workshop not found');
    res.render('workshop-details', { workshop });
  });
};

// Book a workshop
exports.bookWorkshop = (req, res) => {
  const { workshopId, firstName, lastName, email } = req.body;

  if (!workshopId || !firstName || !lastName || !email) {
    return res.status(400).send('All fields are required.');
  }

  const booking = {
    workshopId,
    firstName,
    lastName,
    email,
    date: new Date().toISOString()
  };

  workshopBookingDB.insert(booking, (err) => {
    if (err) return res.status(500).send('Error saving your booking.');
    res.render('workshop-booking-confirmation', { firstName, lastName });
  });
};

// Show admin login page
exports.loginPage = (req, res) => {
  res.render('login');
};
