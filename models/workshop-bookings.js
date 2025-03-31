//Create and load NeDB databse for wokrshop bookins 
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/workshop-bookings.db', autoload: true });

module.exports = db;
