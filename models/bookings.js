const Datastore = require('nedb');
const db = new Datastore({ filename: './data/bookings.db', autoload: true });

module.exports = db;
