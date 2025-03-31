const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

//Public Pages
router.get('/', guestController.home);                          // Home Page
router.get('/login', guestController.loginPage);                // Admin Login Page

//Weekly Classes
router.get('/classes', guestController.showClasses);            // List of Classes
router.get('/class/:id', guestController.classDetails);         // Class Details
router.post('/classes/book', guestController.bookClass);        // Book a Class

//Workshops
router.get('/workshops', guestController.showWorkshops);        // List of Workshops
router.get('/workshop/:id', guestController.workshopDetails);   // Workshop Details
router.post('/workshops/book', guestController.bookWorkshop);   // Book a Workshop

module.exports = router;
