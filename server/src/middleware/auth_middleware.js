const dotenv = require('dotenv');
dotenv.config();

const authenticateStaff = (req, res, next) => {
    const secretKey = req.headers['x-api-key'];
    if(secretKey && secretKey == process.env.API_KEY){
        console.log("Staff Authenticated");
        next();
    } else {
        console.log("Staff not Authenticated");
    }
};

module.exports = authenticateStaff;