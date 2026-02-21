const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
res.send("Welcome to Ramesh Kaka's Digital Counter!");
});
app.get('/status', (req, res) =>{
res.json({ status: "Ready" });
});
app.listen(PORT, () => 
{
console.log(`Counter is open...`);
});