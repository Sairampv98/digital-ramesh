const product = require('../models/productSchema');

// UPDATE Product
pRouter.put('/:id', authenticateStaff, async (req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json({ message: "Product updated", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Product
pRouter.delete('/:id', authenticateStaff, async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product permanently removed from inventory" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/*
6.3 Product Update & Delete (MongoDB)
Update routes/product.js with these minimal routes.
*/