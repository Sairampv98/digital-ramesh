 SELECT customers.customer_name,
    transactions.item_name,
    transactions.amount
    FROM customers
    LEFT JOIN transactions
    ON customers.id =
    transactions.customer_id;

    SELECT customers.customer_name, transactions.amount  
    FROM customers INNER JOIN transactions
    ON customers.id =
    transactions.customer_id 
    WHERE transactions.amount = (SELECT MAX(amount)
    FROM transactions);

    SELECT customers.customer_name, transactions.amount  
    FROM customers INNER JOIN transactions
    ON customers.id =
    transactions.customer_id 
    ORDER BY transactions.amount DESC
    LIMIT 1;

    SELECT customer_name FROM customers WHERE id=(SELECT customer_id FROM transactions ORDER BY amount DESC LIMIT 1);