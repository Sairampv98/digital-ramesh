import express from 'express';

const app = express();
const PORT = 5000;
app.use(express.json());

app.post('/calculate-bill', (req, res) => {
    const { item, price, quantity } = req.body; 

    if (!item || !price || !quantity) {
        return res.status(400).json({ 
            error: "Incomplete slip! Please provide item, price, and quantity." 
        });
    }

    const totalAmount = price * quantity;
    console.log(req.body);
    res.json({
        message: "Order received by Ramesh Kaka",
        item: item,
        total: `${totalAmount}`,
        status: "Ready for Billing"
    });
});

app.listen(PORT, () => {
    console.log(`🚀Counter is running on http://localhost:${PORT}`);
})