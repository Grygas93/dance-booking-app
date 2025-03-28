const Datastore = require('nedb');
const db = new Datastore({ filename: './data/users.db', autoload: true });

module.exports = db;

//  default admin 
db.findOne({ email: 'admin@danceapp.com' }, (err, existingUser) => {
  if (!existingUser) {
    db.insert({
      firstName: 'Admin',
      lastName: 'Account',
      email: 'admin@danceapp.com',
      role: 'admin',
      password: 'admin123'  // możesz zmienić hasło
    });
  }
});
