const mCrud = require('express').Router();
const write = require('../controllers/mongoController');

mCrud.post('/', write);

module.exports = mCrud;