import express from "express";
import route from "./routes/route.js";
import jsonRoute from "./routes/jsonRoute.js"

const app = express();


app.use("/", route);
app.use("/json",jsonRoute);

app.get('/owner', (req, res) =>{
res.json({ "owner": "Sai" });
});

app.get('/customer/Suresh', (req, res) => {
res.send(`Looking for Customer Suresh`);
});

app.get('/customers/:id', (req, res) => {
const customerId = req.params.id;
res.send(`Looking for Customer ID: ${customerId}`);
});

app.use(express.json());
app.post('/customer', (req, res) => {
    const newCustomer = req.body;
    console.log('New Customer:', newCustomer);
    res.status(201).json({ message: "Customer Saved!", data: newCustomer });
});


app.listen(5001,()=>{
    console.log("🚀Counter Running at port 5001");
});
