const mysql = require('./config/db_mysql');
const product = require('./models/productSchema');
const connectMongo = require('./config/db_mongo');

const seed = async () => {
    await connectMongo();
    // 1. Clear & Seed Mongo Products
    await product.deleteMany({});
    await product.insertMany([
        { product_name: 'Milk', product_price: 25, stock: 50 },
        { product_name: 'Bread', product_price: 40, stock: 15 },
        { product_name: 'Eggs', product_price: 6, stock: 100 }
    ]);

    // 2. Seed MySQL Customers & Transactions
    await mysql.execute("INSERT INTO customers (id, customer_name, phone) VALUES (1, 'John Doe', '1234567890') ON DUPLICATE KEY UPDATE id=id");
    await mysql.execute("INSERT INTO transactions (customer_id, item_name, amount) VALUES (1, 'Bread', 40.00)");
    
    console.log("Seeding Complete. Press Ctrl+C to exit.");
};
seed();

/*
2.1 Seed Script (seed.js - Root Folder)
Run this once to see the dashboard in action.
*/
/*
Run this SQL command to add the is_active column to your database:
ALTER TABLE customers ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
*/