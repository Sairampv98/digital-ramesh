const mysqlDB = require('../config/db_mysql');
const product = require('../models/productSchema');

async function report (req, res) {
    try {
        const sql = "SELECT SUM(amount) AS totalSales FROM transactions";
        const[sqlRes] = await mysqlDB.execute(sql);
        const totalMoney = sqlRes[0].totalSales || 0;
        const lowStockItems = await product.find({stock:{$lt:20}});
        res.json({date:Date().toLocalDateString, "totalRevenue(in Rs.)": `Rs. ${totalMoney}`,
            lowStockCount: lowStockItems.length, 
            lowStockItems: lowStockItems.map(item => item.product_name)
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = report;