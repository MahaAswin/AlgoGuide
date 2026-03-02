# 🎯 AlgoGuide - DSA Mentorship Platform

A production-grade SaaS platform for structured Data Structures & Algorithms mentorship focused on placement preparation.

## 🌟 Features

### Role-Based Access Control
- **Admin**: Approve mentors, manage problems, view all submissions
- **Mentor**: Create problems (after approval), view submissions
- **Student**: Solve problems, submit solutions, track progress

### Core Functionality
- ✅ JWT-based authentication
- ✅ Problem management with difficulty levels
- ✅ Code submission system (JavaScript, Python, Java, C++)
- ✅ Real-time leaderboard
- ✅ Topic-wise analytics
- ✅ Mentor approval workflow
- ✅ Docker-based code execution (isolated & secure)

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Express   │────▶│   MongoDB   │
│  Frontend   │     │   Backend   │     │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Docker    │
                    │  Executor   │
                    └─────────────┘
```

## 📁 Project Structure

```
AlgoGuide/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, validation, error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── app.js             # Express app
│   └── server.js          # Entry point
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   ├── services/     # API service
│   │   └── App.jsx       # Main app with routing
│   └── package.json
│
├── executor/              # Code execution microservice
│   ├── server.js         # Execution logic
│   ├── Dockerfile        # Docker configuration
│   └── package.json
│
├── docker-compose.yml     # Full stack orchestration
└── DEPLOYMENT.md          # AWS deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- MongoDB (local or Atlas)
- Docker (optional, for code execution)

### 1. Backend Setup

```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/algoguild
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
EOF

# Start server
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Code Executor Setup (Optional)

```bash
cd executor
npm install
npm run dev
```

Executor runs on `http://localhost:3001`

### 4. Using Docker Compose (All Services)

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 5173
- Executor on port 3001

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/profile          # Get user profile (protected)
```

### Problems
```
GET    /api/problems         # Get all problems (with filters)
POST   /api/problems         # Create problem (admin/mentor)
PUT    /api/problems/:id     # Update problem (admin)
DELETE /api/problems/:id     # Delete problem (admin)
```

### Submissions
```
POST   /api/submissions           # Submit solution (student)
GET    /api/submissions/my        # Get my submissions (student)
GET    /api/submissions/problem/:id  # Get problem submissions (admin/mentor)
```

### Admin
```
GET    /api/admin/stats              # Dashboard statistics
GET    /api/admin/mentors/pending    # Pending mentor approvals
PUT    /api/admin/mentors/approve/:id # Approve mentor
GET    /api/admin/users              # Get all users
```

### Leaderboard
```
GET    /api/leaderboard          # Get leaderboard
GET    /api/leaderboard/analytics # Get topic-wise analytics
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based authorization
- ✅ Input validation middleware
- ✅ ObjectId validation
- ✅ Centralized error handling
- ✅ No password exposure in responses
- ✅ CORS enabled

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ["student", "mentor", "admin"],
  isApproved: Boolean,
  timestamps: true
}
```

### Problem Model
```javascript
{
  title: String,
  description: String,
  difficulty: Enum ["easy", "medium", "hard"],
  topic: String,
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

### Submission Model
```javascript
{
  user: ObjectId (ref: User),
  problem: ObjectId (ref: Problem),
  code: String,
  language: Enum ["javascript", "python", "java", "cpp"],
  status: Enum ["pending", "accepted", "wrong"],
  timestamps: true
}
```

## 🎨 Frontend Routes

```
/                    # Home page
/login               # Login page
/register            # Register page
/problems            # Problems list (protected)
/problems/:id        # Problem detail & submit (protected)
/problems/create     # Create problem (admin/mentor)
/submissions         # My submissions (student)
/leaderboard         # Leaderboard (protected)
/admin               # Admin dashboard (admin only)
```

## 🧪 Testing

### Create Admin User
```bash
# Register with role: "admin" in request body
POST http://localhost:5000/api/auth/register
{
  "name": "Admin User",
  "email": "admin@algoguild.com",
  "password": "admin123",
  "role": "admin"
}
```

### Create Test Problem
```bash
POST http://localhost:5000/api/problems
Authorization: Bearer <admin-token>
{
  "title": "Two Sum",
  "description": "Find two numbers that add up to target",
  "difficulty": "easy",
  "topic": "Arrays"
}
```

## 🚀 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive AWS deployment guide including:
- ECS Fargate setup
- S3 + CloudFront for frontend
- MongoDB Atlas configuration
- CI/CD with GitHub Actions
- Auto-scaling configuration
- Monitoring and logging

## 📈 Performance Optimizations

- ✅ Database indexes on frequently queried fields
- ✅ Aggregation pipelines for leaderboard
- ✅ Stateless authentication (JWT)
- ✅ Ready for Redis caching
- ✅ Docker-based isolated code execution
- ✅ Horizontal scaling ready

## 🔮 Future Enhancements

- [ ] Redis caching for leaderboard
- [ ] Real-time code execution feedback
- [ ] Test case management
- [ ] Discussion forum
- [ ] Email notifications
- [ ] OAuth integration (Google, GitHub)
- [ ] Code plagiarism detection
- [ ] Video tutorials integration
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use this project for learning and commercial purposes.

## 👨‍💻 Author

Built with ❤️ for the coding community

## 🙏 Acknowledgments

- MongoDB for database
- Express.js for backend framework
- React for frontend library
- Docker for containerization
- AWS for cloud infrastructure
