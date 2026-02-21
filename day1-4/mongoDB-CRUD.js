db.products.insertOne({
  name: "Super-Cool Fan",
  category: "Electronics",
  price: 1200,
  inStock: true,
});

db.products.find({ category: "Electronics" });

db.products.updateOne(
{ name: "Super-Cool Fan" }, 
{ $set: { price: 1100 } } 
);

db.products.delete0ne({ name: "Super-Cool Fan" });