const electronicItem = {
  _id: "507f1f77bcf86cd799439011",
  sku: "ELEC–001",
  name: "Super-Cool Fan",
  price: 1200,
  specs: {
    warranty_months: 12,
    power_consumption: "50W",
  },
};
const groceryItem = {
  _id: "507f1f77bcf86cd799439012",
  sk: "GROC–99",
  name: "Organic Tomatoes",
  price: 40,
  unit: "1kg",
  expiry_date: "2024–12–31",
};
const productsCollection = [electronicItem, groceryItem];
console.table(productsCollection);