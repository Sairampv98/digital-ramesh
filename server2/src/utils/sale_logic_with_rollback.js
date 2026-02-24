const product = require('../models/productSchema');
const Customer = require('../models/mongoSchema');
const mysql = require('../config/db_mysql');

const processSale = async (customerId, productName) => {
    // Get a specific connection for the transaction
    const connection = await mysql.getConnection(); 
    try {
        await connection.beginTransaction();

        const [mysqlRows] = await connection.execute("SELECT * FROM customers WHERE id = ?", [customerId]);
        if (mysqlRows.length === 0) throw new Error("Customer not found");

        // Sync to Mongo if needed
        let mongoCust = await Customer.findOne({ mysqlId: customerId });
        if (!mongoCust) {
            mongoCust = new Customer({ customer: mysqlRows[0].customer_name, phone: mysqlRows[0].phone, mysqlId: customerId });
            await mongoCust.save();
        }

        const item = await product.findOne({ product_name: productName });
        if (!item || item.stock < 1) throw new Error("Item out of stock");

        // MySQL Write
        await connection.execute("INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)", 
            [customerId, productName, item.product_price]);

        // MongoDB Write
        item.stock -= 1;
        await item.save();

        await connection.commit(); // Success: Save both
        return { message: "Sale Successful", remainingStock: item.stock };
    } catch (error) {
        await connection.rollback(); // Failure: Undo MySQL
        throw error;
    } finally {
        connection.release();
    }
};
/*
Step 1 Refinement: Atomic Transaction
To prevent a "Ghost Sale" (where a transaction is recorded in MySQL but the stock isn't reduced in Mongo), we use a MySQL transaction. If Mongo fails, we rollback MySQL.
Updated utils/sale_logic.js (Minimal Change):
*/