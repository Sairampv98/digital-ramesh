const product = require('../models/productSchema');
const mysql = require('../config/db_mysql');

const processSale = async (customerId, productName) => {

    console.log(`Starting Sale for Customer_ID: ${customerId}, Item: ${productName}`);

    const item = await product.findOne({product_name: productName});
    if(!item || item.stock <1){
        throw new Error("Item out of stock");
    }
    try {
        const sql = "INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)";
        await mysql.execute(sql, [customerId, productName, item.product_price]);
        const verify = "SELECT id FROM transactions ORDER BY id DESC LIMIT 1"
        const [sqlRes] = await mysql.execute(verify);
        console.log(`MySQL saved new ID: `,sqlRes);

        item.stock -=1;
        await item.save();

        console.log(`Mongo Updated, New stock ${item.product_name}: ${item.stock}`);
        return {message: "Verified Sale", message: "Sale Successful", remainingStock: item.stock}
    } catch (error) {
        console.error("Database Error", error.message);
        throw error;
    }
};

module.exports = processSale;