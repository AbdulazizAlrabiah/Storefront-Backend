CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(128), price NUMERIC(6,2), category VARCHAR(16) );
INSERT INTO products(name, price, category) VALUES ('Milk', 10.99, 'Local');
INSERT INTO products(name, price, category) VALUES ('Egg', 8.99, 'Local');
INSERT INTO products(name, price, category) VALUES ('Peanut Butter', 13.99, 'Local');
INSERT INTO products(name, price, category) VALUES ('Hummus', 14.50, 'Local');
INSERT INTO products(name, price, category) VALUES ('Halloumi Cheese', 17, 'Local');
INSERT INTO products(name, price, category) VALUES ('Orange', 12.99, 'Imported');
INSERT INTO products(name, price, category) VALUES ('Apple', 15.99, 'Imported');
INSERT INTO products(name, price, category) VALUES ('Pineapple', 22, 'Imported');
INSERT INTO products(name, price, category) VALUES ('Peach', 16.50, 'Imported');
INSERT INTO products(name, price, category) VALUES ('Coconut', 25, 'Imported');