const mysqlDB = require('../config/db_mysql');
const product = require('../models/productSchema'); // Import product model

async function report(req, res) {
    try {
        // 1. Total Debt
        const [totalRes] = await mysqlDB.execute("SELECT SUM(amount) AS total FROM transactions");
        
        // 2. Highest Debt Customer
        const [topRes] = await mysqlDB.execute(`
            SELECT c.customer_name, SUM(t.amount) as debt 
            FROM customers c 
            JOIN transactions t ON c.id = t.customer_id 
            WHERE c.is_active = TRUE 
            GROUP BY c.id 
            ORDER BY debt DESC 
            LIMIT 1`);
        /*const [topRes] = await mysqlDB.execute(`
            SELECT c.customer_name, SUM(t.amount) as debt 
            FROM customers c JOIN transactions t ON c.id = t.customer_id 
            GROUP BY c.id ORDER BY debt DESC LIMIT 1`);
        */

        // 3. Latest Debt Item
        const [latestRes] = await mysqlDB.execute(`
            SELECT t.item_name, t.amount, c.customer_name 
            FROM transactions t JOIN customers c ON t.customer_id = c.id 
            ORDER BY t.id DESC LIMIT 1`);

        // Add this into the existing report function:
        const lowStockItems = await product.find({ stock: { $lt: 5 } });
        const stockAlert = lowStockItems.length > 0;

        /*
        res.json({
            totalDebt: totalRes[0].total || 0,
            highestDebtor: topRes[0] || "None",
            latestTransaction: latestRes[0] || "None"
        });
        */
        res.json({
            totalDebt: totalRes[0].total || 0,
            highestDebtor: topRes[0] || "None",
            latestTransaction: latestRes[0] || "None",
            stockAlert: stockAlert, // Boolean flag for UI
            lowStockItems: lowStockItems.map(i => i.product_name)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = report;