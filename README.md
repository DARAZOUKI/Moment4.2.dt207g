# Auth API with JWT

This is a web service that allows users to register and log in, using JSON Web Tokens (JWT) for session management to prevent unauthorized access to resources. It includes functionality to create user accounts, log in, and access protected resources.
## Features

* User Registration
* User Login
* JWT-based Authentication
* Protected Resources

## Technologies Used

 Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, dotenv.


 ## Testing
 Use postman tools for testing:
 * Register a user: 
 Method: POST
 URL: http://localhost:9000/api/register.
 Request Body:

json

{
  "username": "user",
  "password": "password"
}

* Log in as a user:
 Method: POST
 URL: http://localhost:9000/api/login.
 Request Body:

json

{
  "username": "user",
  "password": "password"
}

* Access a protected resource:
 Method: GET
 URL: http://localhost:9000/api/protected.
 Request Body:

json

{
  "username": "user",
  "password": "password"
}

Headers:

"Authorization: Bearer <token>".



## Code Structure

### Server-side
* new/authController.js - Handles registration and login functionality.
* routes/auth.js - Defines routes for registration and login.
* routes/protected.js - Defines route for protected resource.
* middleware/authMiddleware.js - Middleware to verify JWT tokens.
* models/User.js - Mongoose schema and model for user accounts.

  
### Client-side
* src/index.html - The main HTML file containing the structure for the registration, login, and protected content forms.
* src/style.css - CSS file for styling the web page.
* src/script.js - JavaScript file containing the client-side logic for handling registration, login, and accessing protected content.


