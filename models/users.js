//Create and load NeDB databse for users, and insert default admin if not exist
const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const db = new Datastore({ filename: './data/users.db', autoload: true });

module.exports = db;

db.findOne({ email: 'admin@danceapp.com' }, async (err, existingUser) => {
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.insert({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@danceapp.com',
      role: 'admin',
      password: hashedPassword
    });
  }
});
