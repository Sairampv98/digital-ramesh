const express = require('express');
const mysql = require('./config/db_mysql');
const connectMongo = require('./config/db_mongo');
const router = require('./routes/customer_logic');
const mCrud = require('./routes/mongoCrud');
const pRouter = require('./routes/product');
const sRouter = require('./routes/sell');
require('dotenv').config();

const app = express();
connectMongo();
app.use(express.json());
app.use('/products', pRouter);
app.use('/api', router);
app.use('/mongo-crud', mCrud);
app.use('/', sRouter);

app.get('/test', async (req,res) => {
    try {
        const[rows] = await mysql.query("SELECT 'MySQL is Ready' AS stat ");
        /*const[row1] = await mysql.query("SELECT 'Checking if this query will print' AS test");
        , mysql:row1[1].test*/
        res.json({
            mysql:rows[0].stat, mongodb: "connected"
        });
    } catch (error) {
        res.status(500).json({error:"Database Connection Error"});
    }
})
app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});