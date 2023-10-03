# Shaluk: Food and Medicine Order System

## Description

Shaluk is a backend project focused on food and medicine ordering. It utilizes MongoDB Aggregation for performing complex queries, Express.js to create API endpoints, and JWT for authentication. The system allows users to place orders for various foods and medicines, providing a seamless process from order creation to delivery management.

## Features

### 1. Order Placement

- Users can place orders for a variety of foods and medicines.
- Each order contains details about the selected items.

### 2. Admin Handling

- Orders are sent to the admin for processing.
- Admins have the capability to manage and handle incoming orders.

### 3. Delivery Status

- Admins can change the status of orders, indicating different stages such as " "Out for Delivery," and "Delivered."

## Technologies Used

- MongoDB Aggregation: Used for performing complex queries and data manipulations.
- Express.js: Backend framework for creating robust API endpoints.
- JSON Web Tokens (JWT): Employed for secure user authentication.

## Project Structure

The project follows a clear structure:

- `/models`: Contains MongoDB schemas for data modeling.
- `/routes`: Defines Express.js routes for handling different API endpoints.
- `/controllers`: Manages the logic behind each route, including order processing and status updates.
- `/middlewares`: Houses middleware functions, such as authentication using JWT.

## How to Run

1. Clone the repository: `git clone https://github.com/nafiulhasanhamim/shaluk_project_backend_with_mongodb.git`
2. Install dependencies: `npm install`
3. Set up environment variables, including MongoDB connection details and JWT secret.
4. Run the server: `npm start`
