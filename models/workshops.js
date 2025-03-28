const Datastore = require('nedb');
const db = new Datastore({ filename: './data/workshops.db', autoload: true });

module.exports = db;
