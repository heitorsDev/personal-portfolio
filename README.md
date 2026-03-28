# Express Boilerplate

Node.js Express boilerplate with JWT authentication, bcrypt password hashing, Sequelize ORM with SQLite, and cookie-parser.

## Features

- **Authentication**: JWT-based auth with httpOnly cookies
- **Security**: bcrypt for password hashing
- **Database**: Sequelize ORM with SQLite
- **Environment**: dotenv for configuration

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── database.js      # Sequelize configuration
│   ├── controllers/
│   │   └── authController.js # Auth logic
│   ├── middlewares/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   └── User.js           # User model
│   └── routes/
│       ├── auth.js           # Auth routes
│       └── index.js          # Main routes
├── .env.example              # Environment template
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start server**:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/` | API info | No |
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/me` | Get current user | Yes |

## Example Requests

**Register**:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John"}'
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```
