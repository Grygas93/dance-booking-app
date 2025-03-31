//Create and load NeDB databse for classes
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/classes.db', autoload: true });

module.exports = db;
