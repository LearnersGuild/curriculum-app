# Grocery Queries Exercise

___Note:__ This module assumes you've already installed postgresql via homebrew. If you have not done that please do back and do the [Installfest](../Installfest) module._

## Skills

___Note:__ all of the skills below are applicable to any SQL server but were practicing them in postgresql_

- Can select everything from a single table in SQL
- Can select specific columns from a single table in SQL
- Can select a subset of the rows in a table using a where clause in SQL
- Can select from two tables using a join on a primary key id in SQL
- Can select a subset of a table using a join in SQL
- Can describe the difference between a left, right, inner and outer joins in SQL
- Can define a table with a auto sequencing primary key in SQL


## Setup

1. Ensure your postgres server is running: `brew services start postgresql`
2. Create a test database called test_db: `createdb test_db`
3. Open your database in the Postgres console: `psql test_db`
4. Use the following SQL Statement to seed your database with a table and some rows:

```sql
CREATE TABLE groceries (
  id INTEGER PRIMARY KEY,
  item TEXT,
  quantity INTEGER,
  aisle_id INTEGER
);

INSERT INTO groceries (
  id,
  item,
  quantity,
  aisle_id
)
VALUES
  (1, 'Bananas', 4, 2),
  (2, 'Peanut Butter', 3, 1),
  (3, 'Dark Chocolate Bars', 2, 1),
  (4, 'Broccoli', 1, 3),
  (5, 'Cherries', 2, 2),
  (6, 'Asparagus', 6, 3);

CREATE TABLE aisles (
  id INTEGER PRIMARY KEY,
  name TEXT
);

INSERT INTO aisles (
  id,
  name
)
VALUES
  (1, 'Snacks'),
  (2, 'Fruit'),
  (3, 'Vegetables');
```

___TIP:__ try copying the SQL above and then run `pbpaste | psql test_db` in
your terminal_

## Write the following queries


### Select all from the `groceries` table

```sql
# Expected output

id |        item         | quantity | aisle_id
---+---------------------+----------+----------
 1 | Bananas             |        4 |        2
 2 | Peanut Butter       |        3 |        1
 3 | Dark Chocolate Bars |        2 |        1
 4 | Broccoli            |        1 |        3
 5 | Cherries            |        2 |        2
 6 | Asparagus           |        6 |        3
```

### Select all from the `aisles` table

```sql
# Expected output

id |    name
---+------------
 1 | Snacks
 2 | Fruit
 3 | Vegetable
```

### Select all items that have a quantity less than or equal to 3

```sql
# Expected output

id |        item         | quantity | aisle_id
---+---------------------+----------+----------
 2 | Peanut Butter       |        3 |        1
 3 | Dark Chocolate Bars |        2 |        1
 4 | Broccoli            |        1 |        3
 5 | Cherries            |        2 |        2
```

### Select all items that are in the `Fruits` aisle from the `groceries` table

```sql
# Expected output

id |   item   | quantity | aisle_id | id | name
---+----------+----------+----------+----+-------
 1 | Bananas  |        4 |        2 |  2 | Fruit
 5 | Cherries |        2 |        2 |  2 | Fruit
```

### Select all items that are in the `Vegetables` aisle and have a quantity greater than 1 from the `groceries` table

```sql
# Expected output

id |   item    | quantity | aisle_id | id |    name
---+-----------+----------+----------+----+------------
 6 | Asparagus |        6 |        3 |  3 | Vegetables
```
