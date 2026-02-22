const pRouter = require('express').Router();
const product_add = require('../controllers/productController');

pRouter.post('/add', product_add);

module.exports = pRouter;