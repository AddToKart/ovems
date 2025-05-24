# OVEMS - Online Vehicle Management System

A full-stack web application for vehicle management built with React (frontend) and Node.js/Express (backend) with MySQL database.

## 🚀 Features

- **Frontend**: Modern React application with TypeScript
- **Backend**: RESTful API with Node.js, Express, and TypeScript
- **Database**: MySQL with connection pooling
- **Authentication**: JWT-based authentication system
- **Security**: CORS, rate limiting, and helmet protection
- **Role Management**: Admin and user roles with different permissions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) (recommended)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ovems.git
cd ovems
```

### 2. Backend Setup

#### Navigate to Backend Directory

```bash
cd backend
```

#### Install Dependencies

```bash
npm install
```

#### Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
```

Edit `.env` file with your MySQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ovems_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Database Setup

**Option 1: Using MySQL Workbench (Recommended)**

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open and run the script located at `backend/scripts/db-setup.sql`

**Option 2: Manual Setup**

```sql
-- Connect to MySQL and run these commands:
CREATE DATABASE IF NOT EXISTS ovems_db;
USE ovems_db;

-- The application will create tables automatically on first run
```

#### Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or build and run production
npm run build
npm start
```

The backend server will start at `http://localhost:5000`

#### Verify Backend Setup

Visit `http://localhost:5000/api/health` - you should see:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Frontend Setup

#### Navigate to Frontend Directory

```bash
# From the root directory
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Environment Configuration (if needed)

Create a `.env` file in the frontend directory if you need to configure API endpoints:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Start Frontend Development Server

```bash
npm start
```

The frontend application will start at `http://localhost:3000`

## 🔑 Default Admin Account

After setting up the database, you can log in with the default admin account:

- **Email**: `admin@ovems.com`
- **Password**: `admin123`

> ⚠️ **Security Note**: Change the default admin password immediately after first login!

## 📁 Project Structure

```
ovems/
├── frontend/                 # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Main server file
│   ├── scripts/            # Database setup scripts
│   ├── package.json
│   └── ...
└── README.md               # This file
```

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/me` - Get current user profile
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### System

- `GET /api/health` - Health check endpoint

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev          # Start with nodemon for auto-reload
npm run build        # Build TypeScript to JavaScript
npm run test         # Run tests (when implemented)
```

### Frontend Development

```bash
cd frontend
npm start            # Start development server
npm run build        # Build for production
npm run test         # Run tests
```

## 🚀 Production Deployment

### Backend Production

```bash
cd backend
npm run build
npm start
```

### Frontend Production

```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevents abuse with request rate limiting
- **CORS Protection**: Configured for specific frontend origin
- **Helmet**: Security headers for Express
- **Input Validation**: Joi schemas for request validation

## 🐛 Troubleshooting

### Common Issues

1. **MySQL Connection Failed**

   - Verify MySQL server is running
   - Check credentials in `.env` file
   - Ensure database `ovems_db` exists

2. **Port Already in Use**

   - Change `PORT` in backend `.env` file
   - Kill processes using the port: `npx kill-port 5000`

3. **CORS Errors**

   - Verify `FRONTEND_URL` in backend `.env`
   - Check if frontend runs on the correct port

4. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token expiration time

### Database Issues

```bash
# Reset database (WARNING: This will delete all data)
mysql -u root -p
DROP DATABASE ovems_db;
CREATE DATABASE ovems_db;
# Then run the setup script again
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ovems/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔄 Version History

- **v1.0.0** - Initial release with basic authentication and user management

---

**Happy Coding! 🚗💻**
