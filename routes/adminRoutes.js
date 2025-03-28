const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const { verify, verifyAdmin, verifyOrganiser } = require('../auth/auth')

// Login and Logout
router.post('/login', adminController.handleLogin)
router.get('/logout', adminController.logout)

// Admin Dashboard
router.get('/admin', verify, adminController.dashboard)

// Users & Organisers (admin only)
router.get('/admin/users', verifyAdmin, adminController.showUsers)
router.post('/admin/users/delete', verifyAdmin, adminController.deleteUser)
router.get('/admin/users/add', verifyAdmin, adminController.addUserForm)
router.post('/admin/users/add', verifyAdmin, adminController.saveNewUser)
router.get('/admin/users/edit/:id', verifyAdmin, adminController.editUserForm)
router.post('/admin/users/edit', verifyAdmin, adminController.updateUser)

// Classes (admin + organiser)
router.get('/admin/classes', verifyOrganiser, adminController.showClasses)
router.get('/admin/classes/add', verifyOrganiser, adminController.addClassForm)
router.post('/admin/classes/add', verifyOrganiser, adminController.saveNewClass)
router.get('/admin/classes/edit/:id', verifyOrganiser, adminController.editClassForm)
router.post('/admin/classes/edit', verifyOrganiser, adminController.updateClass)
router.post('/admin/classes/delete', verifyOrganiser, adminController.deleteClass)
router.get('/admin/classes-bookings', verifyOrganiser, adminController.showClassBookings)
router.post('/admin/classes-bookings/delete', verifyOrganiser, adminController.deleteClassBooking)

// Workshops (admin + organiser)
router.get('/admin/workshops', verifyOrganiser, adminController.showWorkshops)
router.get('/admin/workshops/add', verifyOrganiser, adminController.addWorkshopForm)
router.post('/admin/workshops/add', verifyOrganiser, adminController.saveNewWorkshop)
router.get('/admin/workshops/edit/:id', verifyOrganiser, adminController.editWorkshopForm)
router.post('/admin/workshops/edit', verifyOrganiser, adminController.updateWorkshop)
router.post('/admin/workshops/delete', verifyOrganiser, adminController.deleteWorkshop)

// Workshop Bookings (admin + organiser)
router.get('/admin/workshop-bookings', verifyOrganiser, adminController.showWorkshopBookings)
router.post('/admin/workshop-bookings/delete', verifyOrganiser, adminController.deleteWorkshopBooking)

// Course Enrollments (admin + organiser)
router.get('/admin/enrollments', verifyOrganiser, adminController.showEnrollments)
router.post('/admin/enrollments/delete', verifyOrganiser, adminController.deleteEnrollment)

module.exports = router
