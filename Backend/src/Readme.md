✅ 1. Set up your project
Initialize a Node.js project with npm init

Install necessary packages: Express, Mongoose, JWT, bcrypt, and any others you need

✅ 2. Create your MongoDB User model
Define one User model

Add fields like name, email, password, etc.

Add a role field with allowed values: "student" or "mentor"

Enable timestamps for createdAt/updatedAt

✅ 3. Connect to MongoDB
Use Mongoose to connect your Express app to MongoDB

Use .env for DB connection string

✅ 4. Create Register Route
Accept user details and a role (student or mentor)

Validate that the role is valid

Hash the password with bcrypt

Save user to DB

Create and return a JWT token containing user ID and role

✅ 5. Create Login Route
Accept email and password

Find user by email

Compare password using bcrypt

If valid, generate and return JWT token (with ID and role)

✅ 6. Create Auth Middleware
Extract token from the Authorization header

Verify token using JWT

Attach user data (ID and role) to the request object

Reject requests without a valid token

✅ 7. Create Role-Based Middleware (optional)
Allow access only if req.user.role matches required roles (student, mentor)

Use it to protect role-specific routes

✅ 8. Create Protected Routes
Add sample routes like:

/student/dashboard → accessible only by students

/mentor/dashboard → accessible only by mentors

Apply the role-based middleware

✅ 9. Test Everything
Use Postman or frontend app to:

Register a student and a mentor

Log in and get tokens

Access protected routes with correct/incorrect roles