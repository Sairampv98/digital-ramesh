const express = require('express');
require('dotenv').config();
const mysqlDB = require('./config/db_mysql');

const app = express();

/* Assumes that the user has connected to the mysql workbench or cli tool to create 
database named 'kaka_grocery_db'
and 2 tables called customer and transactions ahave already been created

const createDB =
  "CREATE DATABASE kaka_grocery_db";
const useDB = 
"USE kaka_grocery_db";
*/
  try {
  
  } catch (error) {
    console.error("cloud_mysql error",error.message);
  }

(async () => {
  await setupMysql();
})();
