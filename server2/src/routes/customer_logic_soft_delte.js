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
