router.get('/search', async (req, res) => {
    const { q } = req.query; // e.g. /api/search?q=John
    try {
        let sql, params;
        if (!isNaN(q)) {
            sql = "SELECT * FROM customers WHERE id = ?";
            params = [q];
        } else {
            sql = "SELECT * FROM customers WHERE customer_name LIKE ?";
            params = [`%${q}%`];
        }
        const [rows] = await mysqlDB.execute(sql, params);
        res.json(rows); // Frontend handles if rows.length > 1
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
Step 2: Dummy Data & Dashboard Logic
The Implementation Plan:
Seeding: A simple script seed.js to populate MySQL and MongoDB with related data.
Dashboard Logic: Update controllers/summaryController.js to perform the "Heavy Lifting" queries (Total Debt, Top Debtor, Latest Transaction).
Search Logic: Add a search endpoint that detects if the input is a Number (ID) or String (Name).
2.3 Search Functionality (routes/customer_logic.js)
Add this route to handle both ID and Name searches.
*/