import express from 'express';

const app = express();
const PORT = 5000;
app.use(express.json());

const customers = [
    { id: 1, name: "Suresh" },
    { id: 2, name: "Mahesh" }
];

app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    res.send(`Kaka is looking for Customer ID: ${customerId}`);
});


app.post('/customers', (req, res) => {
    const newCustomer = req.body; 
    console.log("New Customer Received:", newCustomer);
    res.status(201).json({ message: "Customer Saved!", data: newCustomer });
});

app.listen(PORT, () => {
    console.log(`🚀Counter is running on http://localhost:${PORT}`);
})