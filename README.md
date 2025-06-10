# Contact Management API

A simple Node.js RESTful API for managing user contacts, with authentication and MySQL database support.

---

## Features

- User registration and login (JWT authentication)
- CRUD operations for contacts (Create, Read, Update, Delete)
- Contacts support tags (as JSON array)
- Pagination for listing contacts
- MySQL database integration
- Secure password hashing

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/contact-management-api.git
   cd contact-management-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory with the following content:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=contact_db
   JWT_SECRET=your_jwt_secret
   ```

   Replace values as needed.

4. **Set up the database**

   - Create the MySQL database and tables by running the SQL script:

     ```sql
     -- Create database and tables
     CREATE DATABASE contact_db;
     USE contact_db;

     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
     );

     CREATE TABLE contacts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       tags JSON NOT NULL,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
     );
     ```

5. **Start the server**

   ```bash
   npm start
   ```
   - The server will run at [http://localhost:5000](http://localhost:5000) by default.

---

## API Documentation

### Authentication

- `POST /auth/register`  
  Register a new user  
  Body: `{ "name": "John Doe", "email": "john@example.com", "password": "yourpassword" }`

- `POST /auth/login`  
  Log in and receive a JWT token  
  Body: `{ "email": "john@example.com", "password": "yourpassword" }`  
  Response: `{ "token": "..." }`

### Contact Routes (require `Authorization: Bearer <token>` header)

- `GET /contacts`  
  Get all contacts for logged-in user  
  Supports pagination:  
  `GET /contacts?page=1&limit=10`

- `GET /contacts/:id`  
  Get a single contact by ID

- `POST /contacts`  
  Create a new contact  
  Body:  
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "tags": ["friend", "work"]
  }
  ```

- `PUT /contacts/:id`  
  Update a contact by ID  
  Body: same as above

- `DELETE /contacts/:id`  
  Delete a contact by ID

---

## Postman Collection

A [Postman collection](./postman/ContactAPI.postman_collection.json) is included in the `postman/` folder.

1. Import the collection into Postman.
2. Set the `base_url` variable to your server URL (e.g., `http://localhost:5000`).
3. Authenticate using `/auth/login` and set the `token` variable for authorized requests.

---

## Example Environment Variables (`.env`)

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=contact_db
JWT_SECRET=your_jwt_secret
```

---

## License

MIT

---

## Author

Samarth0809
