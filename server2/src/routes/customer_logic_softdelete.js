router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        let sql, params;
        if (!isNaN(q)) {
            // Added AND is_active = TRUE
            sql = "SELECT * FROM customers WHERE id = ? AND is_active = TRUE";
            params = [q];
        } else {
            // Added AND is_active = TRUE
            sql = "SELECT * FROM customers WHERE customer_name LIKE ? AND is_active = TRUE";
            params = [`%${q}%`];
        }
        const [rows] = await mysqlDB.execute(sql, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});