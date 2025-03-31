//Create and load NeDB databse for enrollments
const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({
  filename: path.join(__dirname, '../data/enrollments.db'),
  autoload: true,
});

module.exports = db;
