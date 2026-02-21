const express = require('express');
const mysql = require('./config/db_mysql');
const connectMongo = require('./config/db_mongo');
require('dotenv').config();

const app = express();
connectMongo();

app.get('/test', async (req,res) => {
    try {
        const[rows] = await mysql.query("SELECT 'MySQL is Ready' AS stat");
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