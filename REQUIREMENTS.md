# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
- Index: 'api/products' [GET]
- Show: 'api/product/:id' [GET]
- Create (Add product to user's order): 'api/product' [POST] [token required]

#### Users
- Index: 'api/users' [GET] [token required]
- Show: 'api/user/:id' [GET] [token required]
- Create: 'api/user' [POST] [token returned]

#### Orders
- Current Order by user: 'api/order' [token required]

## Database Schema

#### products
- id: primary Key 
- name: VARCHAR(128)
- price: NUMERIC(6, 2)
- category: VARCHAR(16) [Local or Imported]

#### users
- id: primary Key
- first_name: VARCHAR(64)
- last_name: VARCHAR(64)
- password: VARCHAR(256)

#### orders
- id: primary Key
- user_id: users table foreign key
- status: VARCHAR(16) [Active or Complete]

#### order_products
- id: primary Key
- product_id: products table foreign key
- order_id: orders table foreign key
- quantity: integer

