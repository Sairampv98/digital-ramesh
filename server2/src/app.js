// Resource-based naming for predictable frontend calls
app.use('/api/customers', router); // All customer CRUD
app.use('/api/products', pRouter);  // All product CRUD
app.use('/api/sales', sRouter);     // Transactions
app.use('/api/analytics', summary); // Dashboard/Reports
app.use('/api/external', testRouter); // API Sync
app.use('/api/weather', wRouter);   // Weather
/*
Step 7: Streamline Endpoints for React
To make the frontend code cleaner, we will group the routes in app.js using consistent naming conventions.
Update app.js (Route Mapping section):
*/