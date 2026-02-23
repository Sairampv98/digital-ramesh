const testRouter = require('express').Router();
const tester = require('../utils/test');

testRouter.get('/', async (req,res) => {
    const output = await tester();
    res.json({message: `External data ${output}` });
});


module.exports = testRouter;