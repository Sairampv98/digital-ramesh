/*
Step 5: Staff-Only Product & Customer Addition
The Implementation Plan:
Protect Routes: Apply the authenticateStaff middleware to the POST routes for both products (MongoDB) and customers (MySQL).
5.1 Update routes/product.js (MongoDB Product)
*/
const pRouter = require('express').Router();
const product_add = require('../controllers/productController');
const authenticateStaff = require('../middleware/auth_middleware');

// Now protected: Only staff with API key can add products
pRouter.post('/add', authenticateStaff, product_add);

module.exports = pRouter;