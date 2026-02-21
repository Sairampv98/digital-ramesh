const customerOrder = {
    customerName : "Suresh",
    item: "Milk Packet",
    quantity: 2,
    pricePerUnit: 30
};

const totalBill = customerOrder.quantity * customerOrder.pricePerUnit;
console.log("Customer: " + customerOrder.customerName);
console.log("Ordered: " + customerOrder.item);
console.log("Total Amount: " + totalBill);
console.log(customerOrder);