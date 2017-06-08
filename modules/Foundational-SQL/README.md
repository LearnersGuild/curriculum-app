# Foundational SQL

## Skills

- [ ] can select everything from a single table
- [ ] can select everything from two tables using a join on a primary key id
- [ ] can select a subset of a table using a where clause
- [ ] more TBD…


## Resources

- https://www.khanacademy.org/computing/computer-programming/sql
- http://www.postgresqltutorial.com/
- https://www.tutorialspoint.com/postgresql/
- https://pgexercises.com/questions/basic/
- http://postgresguide.com/
- http://w3resource.com/PostgreSQL/tutorial.php
- https://www.udemy.com/beginners-guide-to-postgresql/
- https://www.postgresql.org/docs/9.2/static/tutorial.html
- https://www.postgresql.org/docs/
- https://sqlbolt.com/lesson/select_queries_order_of_execution
- http://sqlzoo.net/

## Exercises

1. Complete the Khan Academy section on SQL Basics and use the
 the following tutorials as guides to solving the tasks below:
  - [ ] [SQL Basics](https://www.khanacademy.org/computing/computer-programming/sql/sql-basics/v/welcome-to-sql)
  - [ ] [SQL Tutorial](https://www.w3schools.com/sql/)
  - [ ] [PostgreSQL Exercises](https://pgexercises.com/questions/basic/)

2. Practice on your local machine
  - [ ] Install PostgreSQL using Homebrew: `brew install postgresql`
  - [ ] Create a test database called test_db: `createdb test_db`
  - [ ] Run a local postgres server: `brew services start postgresql`
  - [ ] Open your database in the Postgres console: `psql test_db`
  - [ ] Use the following SQL Statement to seed your database with a table and some rows:

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

  - [ ] Select all from the `groceries` table
  ```sql
  # Expected output

  id |        item         | quantity | aisle_id
----+---------------------+----------+----------
  1 | Bananas             |        4 |        2
  2 | Peanut Butter       |        3 |        1
  3 | Dark Chocolate Bars |        2 |        1
  4 | Broccoli            |        1 |        3
  5 | Cherries            |        2 |        2
  6 | Asparagus           |        6 |        3
  ```

  - [ ] Select all from the `aisles` table
  ```sql
  # Expected output

  id |    name
 ----+------------
   1 | Snacks
   2 | Fruit
   3 | Vegetable
  ```

  - [ ] Select all items that have a quantity less than or equal to 3
  ```sql
  # Expected output

  id |        item         | quantity | aisle_id
 ----+---------------------+----------+----------
   2 | Peanut Butter       |        3 |        1
   3 | Dark Chocolate Bars |        2 |        1
   4 | Broccoli            |        1 |        3
   5 | Cherries            |        2 |        2
  ```

  - [ ] Select all items that are in the `Fruits` aisle from the `groceries` table

  ```sql
  # Expected output

  id |   item   | quantity | aisle_id | id | name
 ----+----------+----------+----------+----+-------
   1 | Bananas  |        4 |        2 |  2 | Fruit
   5 | Cherries |        2 |        2 |  2 | Fruit
  ```

  - [ ] Select all items that are in the `Vegetables` aisle and have a quantity greater than 1 from the `groceries` table

  ```sql
  # Expected output

  id |   item    | quantity | aisle_id | id |    name
 ----+-----------+----------+----------+----+------------
   6 | Asparagus |        6 |        3 |  3 | Vegetables
  ```
