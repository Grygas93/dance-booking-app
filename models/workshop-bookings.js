const Datastore = require('nedb');
const db = new Datastore({ filename: './data/workshop-bookings.db', autoload: true });

module.exports = db;
