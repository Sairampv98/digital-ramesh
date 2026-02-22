const product = require('./models/productSchema');
const mysql = require('./config/db_mysql');

const processSale = async (customerId, productName) => {
    const item = await product.findOne({product_name: productName});
    if(!item || item.stock <1){
        throw new Error("Item out of stock");
    }
    const sql = "INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)";
    await mysql.execute(sql, [customerId, productName, item.product_price]);

    item.stock -=1;
    await item.save();

    return {message: "Sale Successful", remainingStock: item.stock};
};

module.exports = processSale;