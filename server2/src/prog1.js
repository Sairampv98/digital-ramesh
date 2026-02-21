import express from 'express';

const app = express();
const PORT = 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Ramesh kaka's Digital Counter 🛍️");
});

app.get('/status', (req, res) => {
  res.json({ 
    "shop": "OPEN!",
    "manager":"Node.js",
    "status":"Ready to take orders!"
    });
});

app.listen(PORT, () => {
    console.log(`🚀Counter is running on http://localhost:${PORT}`);
})


