const sqlLedger = [
    {id: 1, name:"Suresh", debt: 500},
    {id: 2, name:"Mahesh", debt: 200}
];

const mongoCatalogue = [
    {name: "Lux", brand:"Unilever"},
    {name: "Basmati Rice", weight: "5kg", type: "premium"}
];

console.table(sqlLedger);
console.log(mongoCatalogue);