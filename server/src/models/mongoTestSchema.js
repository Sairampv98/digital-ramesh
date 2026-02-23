const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    userID: {
        type: Number
    },
    id: {
        type: Number
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
});

const test = mongoose.model("test", testSchema);

module.exports = test;