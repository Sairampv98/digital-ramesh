

// Now protected: Only staff can register new customers
router.post('/register', authenticateStaff, async (req, res) => {
    // ... existing registration logic
});
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
// UPDATE Customer
router.put('/customer/:id', authenticateStaff, async (req, res) => {
    const { customer_name, phone } = req.body;
    try {
        const sql = "UPDATE customers SET customer_name = ?, phone = ? WHERE id = ?";
        await mysqlDB.execute(sql, [customer_name, phone, req.params.id]);
        res.json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// SOFT DELETE Customer
router.delete('/customer/:id', authenticateStaff, async (req, res) => {
    try {
        const sql = "UPDATE customers SET is_active = FALSE WHERE id = ?";
        await mysqlDB.execute(sql, [req.params.id]);
        res.json({ message: "Customer deactivated (Soft Deleted)" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/*
6.2 Customer Update & Soft Delete (MySQL)
Update routes/customer_logic.js with these minimal routes.
*/

/*
Step 2: Dummy Data & Dashboard Logic
The Implementation Plan:
Seeding: A simple script seed.js to populate MySQL and MongoDB with related data.
Dashboard Logic: Update controllers/summaryController.js to perform the "Heavy Lifting" queries (Total Debt, Top Debtor, Latest Transaction).
Search Logic: Add a search endpoint that detects if the input is a Number (ID) or String (Name).
2.3 Search Functionality (routes/customer_logic.js)
Add this route to handle both ID and Name searches.
*/
/*
5.2 Update routes/customer_logic.js (MySQL Customer)
*/