😀 Welcome to the Eshop API! <br />This RESTful API provides a simple and efficient way to manage an e-commerce platform. <br />It supports CRUD operations for categories, products, orders, and users, with secure authentication using JWT (JSON Web Tokens).

<b>Features<br />
CRUD Operations: Create, Read, Update, and Delete for:</b>

1. Categories: Manage product categories.
2. Products: Handle product information.
3. Orders: Process customer orders.
4. Users: Manage user accounts.
5. Authentication: Secure your API with JWT, ensuring that only authorized users can access protected routes.

Getting Started<br /><br />
<b>Prerequisites</b><br /><br />
Node.js (v12 or higher)<br />
npm or yarn<br />
MongoDB (or your preferred database)<br /><br />
<b>Installation</b><br />

Clone the repository:
```
git clone https://github.com/YuHsuan-Lu/Eshop_api.git
```

Navigate to the project directory:
```
cd eshop_api
```
Install the dependencies:
```
npm install
```

Create a .env file in the root directory and set up your environment variables. 
Example:
```
// in .env file
PORT=3000
MONGO_URI=mongodb://localhost:27017/eshop
JWT_SECRET=your_jwt_secret
```
Start the server:
```
npm start
```

API Endpoints
1. Categories
  + GET /api/v1/categories: Retrieve all categories
  + GET /api/v1/categories/:categoryId: Retrieve a specific categorie
  + POST /api/v1/categories: Create a new category
  + PUT /api/v1/categories/:categoryId: Update a category
  + DELETE /api/v1/categories/:categoryId: Delete a category
2. Products
  + GET /api/v1/products: Retrieve all products
  + GET /api/v1/products/:productId': Retrieve a specific products
  + GET /api/v1/products/get/count': Retrieve the total count of products
  + GET /api/v1/products/get/featured/:count': Return a featured list with a count of 'count'
  + POST /api/v1/products: Create a new product
  + PUT /api/v1/products/gallery-images/:productId: Upload gallery-image to a product
  + DELETE /api/v1/products/:productId: Delete a product
3. Orders
  + GET /api/v1/orders: Retrieve all orders
  + GET /api/v1/orders/:orderId: Retrieve a specific order
  + GET /api/v1/orders/get/sum: Retrieve the total revenue of orders
  + GET /api/v1/orders/get/count: Retrieve the total count of orders
  + POST /api/v1/orders: Create a new order
  + PUT /api/v1/orders/:orderId: Update an order
  + DELETE /api/v1/orders/:orderId: Delete an order
4. Users
  + GET /api/v1/users: Retrieve all users
  + GET /api/v1/users/:userId: Retrieve a specific user
  + GET /api/v1/users/get/count: Retrieve the total count of users
  + POST /api/v1/users/signup: Create a new user
  + POST /api/v1/users/login: Login to an existed account, and get JWT assignment
  + DELETE /api/v1/users/:userId: Delete a user

Authentication<br />
1. user are not allow to use api without authentication<br />
<img src="https://github.com/user-attachments/assets/83ca04b6-aa10-4eda-81c4-9a771f947309" alt="Screenshot" width="500" /><br />
2. login and get the JWT token<br />
<img src="https://github.com/user-attachments/assets/b817d55c-5ae1-4708-96c6-f907bd72ed00" alt="Screenshot" width="500" /><br />
3. after authentication, the api is accessible<br />
<img src="https://github.com/user-attachments/assets/5318235e-571f-4b41-8225-bc74a03951bf" alt="Screenshot" width="500" /><br />

