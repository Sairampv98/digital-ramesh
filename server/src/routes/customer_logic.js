const router = require('express').Router();
const mysqlDB = require('../config/db_mysql');
const authenticateStaff = require('../middleware/auth_middleware');
const validatorCustomer = require('../utils/validator');

router.post('/register', async (req,res) => {
    const message = validatorCustomer(req.body);
      if(message !=null){
        res.status(400).json({message:"Invalid Input", status:false, error:message});
    }
    try {
        const {customer_name, phone} = req.body;
        const sql = "INSERT INTO customers (customer_name, phone) VALUES (?, ?)";
        const[result] = await mysqlDB.execute(sql, [customer_name,phone]);
        res.status(201).json({message: "Customer Added successfully", result: result.insertId});
    } catch (error) {
        console.error("Customer could not be added error: ", error.message);
        res.status(500).json({error: "Could not save customer: ", details: error.message});
    }
});

router.get('/customer/:id', async(req, res) => {
    try{
        const sql = 'SELECT * FROM customers WHERE id= ?';
        const [rows] = await mysqlDB.execute(sql, [req.params.id]);
        res.status(200).json({customer :rows[0]});
    }catch(error){
        console.error("Internal server error: ", error.message);
        res.status(500).json({error: "Internal Server error", Message: error.Message});
    }
    
});

router.post('/products', authenticateStaff, (req,res)=>{
    res.json({message: "Staff can add products"});
});
module.exports = router;