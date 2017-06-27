# Shopping Cart Schema Design

Design the SQL schema for a simple shopping cart database.

### The schema design should satisfy the following constraints:

- A user has a `name`
- A user can have many orders
- An order has an `order date` and at least 1 item.
- An item has a `name`, `price` and `quantity`

Create a file called `shopping-cart-schema.sql` that contains the schema.

### Questions I should be able to answer with the design:

- What is the average number of items per order?
- What is the name of the user who purchased the costliest item?
- Average cost of an order per user

Hint: many to many relationship will make things simpler
