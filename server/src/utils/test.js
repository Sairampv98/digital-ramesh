const axios = require('axios');
const mongoTest = require('../models/mongoTestSchema');
const express = require('express');

const app = express();
app.use(express.json());

const tester = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const {userID, id, title, body} = response.data;
        const newTest_input = new mongoTest({userID, id, title, body} );
        const tested = await newTest_input.save();
        console.log(tested);
        return tested;
    } catch (error) {
        console.error("External API failed: ", error.message);
        return error.messsage;
    }
};

module.exports = tester;