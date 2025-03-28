const classDB = require('../models/classes');
const workshopDB = require('../models/workshops');
const workshopBookingDB = require('../models/workshop-bookings');
const enrollmentDB = require('../models/enrollments');
const bookingDB = require('../models/bookings');
const userDB = require('../models/users');

exports.dashboard = (req, res) => {
  const user = req.session.user;
  const isAdmin = user.role === 'admin';
  const isOrganiser = user.role === 'organiser';

  res.render('admin', {
    adminName: user.firstName,
    isAdmin,
    isOrganiser,
    roleName: isAdmin ? 'Admin Panel' : 'Organiser Panel',
  });
};

exports.showClasses = (req, res) => {
  classDB.find({}, (err, classes) => {
    if (err) return res.status(500).send('Error reading classes.');
    res.render('admin-classes', { classes });
  });
};

exports.addClassForm = (req, res) => {
  res.render('admin-add-class');
};

exports.saveNewClass = (req, res) => {
  const { day, time, name, level, duration, location, price } = req.body;
  const newClass = { day, time, name, level, duration, location, price };

  classDB.insert(newClass, err => {
    if (err) return res.status(500).send('Error adding class.');
    res.redirect('/admin/classes');
  });
};

exports.editClassForm = (req, res) => {
  classDB.findOne({ _id: req.params.id }, (err, classData) => {
    if (!classData) return res.status(404).send('Class not found');
    res.render('admin-edit-class', { class: classData });
  });
};

exports.updateClass = (req, res) => {
  const { id, day, time, name, level } = req.body;

  classDB.update({ _id: id }, { $set: { day, time, name, level } }, {}, err => {
    if (err) return res.status(500).send('Error updating class.');
    res.redirect('/admin/classes');
  });
};

exports.deleteClass = (req, res) => {
  classDB.remove({ _id: req.body.id }, {}, err => {
    if (err) return res.status(500).send('Error deleting class.');
    res.redirect('/admin/classes');
  });
};


exports.showWorkshops = (req, res) => {
  workshopDB.find({}, (err, workshops) => {
    if (err) return res.status(500).send('Error loading workshops.');
    res.render('admin-workshops', { workshops });
  });
};

exports.addWorkshopForm = (req, res) => {
  res.render('admin-add-workshop');
};

exports.saveNewWorkshop = (req, res) => {
  const { name, style, level, startDate, endDate, time, price, description } = req.body;
  const newWorkshop = { name, style, level, startDate, endDate, time, price, description };

  workshopDB.insert(newWorkshop, err => {
    if (err) return res.status(500).send('Error adding workshop.');
    res.redirect('/admin/workshops');
  });
};

exports.editWorkshopForm = (req, res) => {
  workshopDB.findOne({ _id: req.params.id }, (err, workshop) => {
    if (!workshop) return res.status(404).send('Workshop not found.');
    res.render('admin-edit-workshop', { workshop });
  });
};

exports.updateWorkshop = (req, res) => {
  const { id, name, style, level, startDate, endDate, time, price, description } = req.body;

  workshopDB.update(
    { _id: id },
    { $set: { name, style, level, startDate, endDate, time, price, description } },
    {},
    err => {
      if (err) return res.status(500).send('Error updating workshop.');
      res.redirect('/admin/workshops');
    }
  );
};

exports.deleteWorkshop = (req, res) => {
  workshopDB.remove({ _id: req.body.id }, {}, err => {
    if (err) return res.status(500).send('Error deleting workshop.');
    res.redirect('/admin/workshops');
  });
};


exports.showWorkshopBookings = (req, res) => {
  const workshopId = req.query.workshopId;
  const query = workshopId ? { workshopId } : {};

  workshopBookingDB.find(query, (err, bookings) => {
    if (err) return res.status(500).send('Error reading bookings.');

    workshopDB.find({}, (err, workshops) => {
      if (err) return res.status(500).send('Error reading workshops.');

      const workshopsWithSelected = workshops.map(w => ({
        ...w,
        selected: w._id === workshopId,
      }));

      res.render('admin-workshop-bookings', {
        bookings,
        workshops: workshopsWithSelected,
        selectedWorkshopId: workshopId,
      });
    });
  });
};

exports.deleteWorkshopBooking = (req, res) => {
  const bookingId = req.body.id;

  workshopBookingDB.remove({ _id: bookingId }, {}, err => {
    if (err) return res.status(500).send('Error deleting booking.');
    res.redirect('/admin/workshop-bookings');
  });
};


exports.showEnrollments = (req, res) => {
  const courseId = req.query.courseId;
  const query = courseId ? { courseId } : {};

  enrollmentDB.find(query, (err, enrollments) => {
    if (err) return res.status(500).send('Error reading enrollments.');

    const courseDB = require('../models/courses');

    courseDB.find({}, (err, courses) => {
      if (err) return res.status(500).send('Error reading courses.');

      const enrollmentsWithCourseNames = enrollments.map(enroll => {
        const course = courses.find(c => c._id === enroll.courseId);
        return {
          ...enroll,
          courseName: course ? course.name : 'Unknown course',
        };
      });

      const enhancedCourses = courses.map(c => ({
        ...c,
        selected: c._id === courseId ? 'selected' : '',
      }));

      res.render('admin-enrollments', {
        enrollments: enrollmentsWithCourseNames,
        courses: enhancedCourses,
      });
    });
  });
};

exports.deleteEnrollment = (req, res) => {
  enrollmentDB.remove({ _id: req.body.id }, {}, err => {
    if (err) return res.status(500).send('Error deleting enrollment.');
    res.redirect('/admin/enrollments');
  });
};


exports.showClassBookings = (req, res) => {
  const type = req.query.type;
  const filter = type ? { classType: type } : {};

  bookingDB.find({}, (err, bookings) => {
    if (err) return res.status(500).send('Error retrieving bookings.');

    classDB.find({}, (err, classes) => {
      if (err) return res.status(500).send('Error retrieving class data.');

      const enrichedBookings = bookings.map(b => {
        const matchedClass = classes.find(c => c._id === b.classId);
        return {
          ...b,
          classType: matchedClass ? matchedClass.name : 'Unknown',
        };
      });

      const filtered = type
        ? enrichedBookings.filter(b => b.classType === type)
        : enrichedBookings;

      const uniqueClassNames = [...new Set(classes.map(c => c.name))];
      const classTypes = uniqueClassNames.map(name => ({
        name,
        selected: name === type,
      }));

      res.render('admin-classes-bookings', {
        bookings: filtered,
        classTypes,
        selectedType: type,
      });
    });
  });
};

exports.deleteClassBooking = (req, res) => {
  const bookingId = req.body.id;

  bookingDB.remove({ _id: bookingId }, {}, err => {
    if (err) return res.status(500).send('Error deleting class booking.');
    res.redirect('/admin/classes-bookings');
  });
};


exports.handleLogin = (req, res) => {
  const { email, password } = req.body;

  userDB.findOne({ email: email }, (err, user) => {
    if (err || !user) return res.send('Invalid credentials');
    if (user.password !== password) return res.send('Invalid credentials');

    req.session.user = user;
    res.redirect('/admin');
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};


exports.showUsers = (req, res) => {
  userDB.find({}, (err, users) => {
    if (err) return res.status(500).send('Error loading users.');
    res.render('admin-users', { users });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.body.id;

  userDB.findOne({ _id: userId }, (err, user) => {
    if (user && user.email === 'admin@danceapp.com') {
      return res.send('This admin account cannot be deleted.');
    }

    userDB.remove({ _id: userId }, {}, err => {
      if (err) return res.status(500).send('Error deleting user.');
      res.redirect('/admin/users');
    });
  });
};

exports.addUserForm = (req, res) => {
  res.render('admin-add-user');
};

exports.saveNewUser = (req, res) => {
  const { firstName, lastName, email, role, password } = req.body;

  if (!firstName || !lastName || !email || !role || !password) {
    return res.status(400).send('All fields are required.');
  }

  userDB.findOne({ email }, (err, existingUser) => {
    if (err) return res.status(500).send('Database error.');
    if (existingUser) return res.send('A user with this email already exists.');

    userDB.insert({ firstName, lastName, email, role, password }, err => {
      if (err) return res.status(500).send('Error saving user.');
      res.redirect('/admin/users');
    });
  });
};

exports.editUserForm = (req, res) => {
  const userId = req.params.id;

  userDB.findOne({ _id: userId }, (err, user) => {
    if (err || !user) return res.status(404).send('User not found.');

    if (user.email === 'admin@danceapp.com') {
      return res.status(403).send('Default admin cannot be edited.');
    }

    res.render('admin-edit-user', {
      ...user,
      isAdmin: user.role === 'admin',
      isOrganiser: user.role === 'organiser',
    });
  });
};

exports.updateUser = (req, res) => {
  const { id, firstName, lastName, email, role } = req.body;

  userDB.findOne({ _id: id }, (err, user) => {
    if (user && user.email === 'admin@danceapp.com') {
      return res.send('This admin account cannot be edited.');
    }

    userDB.update({ _id: id }, { $set: { firstName, lastName, email, role } }, {}, err => {
      if (err) return res.status(500).send('Error updating user.');
      res.redirect('/admin/users');
    });
  });
};
