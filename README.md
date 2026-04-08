# 🛒 E-Commerce Backend API

> A scalable and secure RESTful backend for an e-commerce platform built using Node.js, Express, and MongoDB.

---

## ✨ Overview

This project simulates a real-world e-commerce backend system.  
It includes authentication, product management, cart functionality, and order processing using REST APIs.

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)  

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration & login  
- JWT-based authentication  
- Role-based access control (Admin/User)  

### 📦 Product Management
- Create, update, delete products (Admin only)  
- Fetch all products and product details  

### 🛒 Cart System
- Add items to cart  
- Remove items from cart  
- Clear cart  

### 📄 Order Management
- Create order  
- Get user orders  
- Get order by ID  
- Update & delete orders (Admin only)  

---

## 📡 API Routes

### 🔑 Auth
POST /api/users/register  
POST /api/users/login  

### 📦 Products
GET /api/products  
GET /api/products/:id  
POST /api/products (Admin)  
PUT /api/products/:id (Admin)  
DELETE /api/products/:id (Admin)  

### 🛒 Cart
POST /api/cart  
GET /api/cart  
DELETE /api/cart/:productId  
DELETE /api/cart  

### 📄 Orders
POST /api/orders  
GET /api/orders/my_orders  
GET /api/orders/:id  
PUT /api/orders/:id (Admin)  
DELETE /api/orders/:id (Admin)  

---

## 🧪 Example Request

POST /api/orders

{
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "price": 500
    }
  ],
  "totalAmount": 1000,
  "shippingAddress": "Kolkata, India"
}

---

## 🛠️ Setup & Installation

git clone https://github.com/Smitojit/ecommerce-backend-api.git  
cd ecommerce-backend-api  
npm install  

Create a `.env` file:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=3000  

Run the server:

npm run dev  

---

## 📈 Future Improvements

- React frontend integration  
- Payment gateway integration  
- Deployment (Render / AWS)  

---

## 👨‍💻 Author

**Smitojit**  
Aspiring Full Stack Developer 🚀