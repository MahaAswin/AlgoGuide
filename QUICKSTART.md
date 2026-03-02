# 🚀 Quick Start Guide - AlgoGuild

## Prerequisites
- Node.js v22+
- MongoDB (local or Atlas)
- Git

## 🎯 Setup in 5 Minutes

### Step 1: Clone & Install

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

# Executor (optional)
cd ../executor
npm install
```

### Step 2: Configure Environment

**Backend (.env)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/algoguild
JWT_SECRET=my-secret-key-12345
NODE_ENV=development
```

### Step 3: Start Services

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

**Terminal 3 - Executor (Optional)**
```bash
cd executor
npm run dev
```

### Step 4: Access Application

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Executor: http://localhost:3001

## 🧪 Test the Application

### 1. Register Admin
- Go to http://localhost:5173/register
- Name: Admin User
- Email: admin@test.com
- Password: admin123
- Role: Admin
- Click Register

### 2. Create a Problem
- Login as admin
- Click "Create Problem"
- Title: Two Sum
- Description: Find two numbers that add up to target
- Difficulty: Easy
- Topic: Arrays
- Click Create

### 3. Register Student
- Logout
- Register new user with role "Student"
- Email: student@test.com
- Password: student123

### 4. Submit Solution
- Login as student
- Browse problems
- Click on "Two Sum"
- Write code
- Select language
- Submit

### 5. Check Leaderboard
- Navigate to Leaderboard
- View rankings

## 🐳 Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📁 Project Structure

```
AlgoGuide/
├── server/          # Backend API
├── client/          # React Frontend
├── executor/        # Code Execution Service
└── docker-compose.yml
```

## 🔧 Common Issues

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/algoguild
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### CORS Error
- Backend CORS is enabled by default
- Check API URL in frontend matches backend

## 📚 Next Steps

1. ✅ Test all features
2. ✅ Create sample problems
3. ✅ Test role-based access
4. ✅ Review code structure
5. ✅ Read DEPLOYMENT.md for production

## 🎓 Key Features to Test

- [x] User registration (Admin, Mentor, Student)
- [x] Login/Logout
- [x] Mentor approval (Admin)
- [x] Create problems (Admin/Mentor)
- [x] Submit solutions (Student)
- [x] View submissions
- [x] Leaderboard
- [x] Topic analytics
- [x] Role-based routing

## 💡 Tips

- Use Postman/Thunder Client for API testing
- Check browser console for errors
- Check terminal logs for backend errors
- MongoDB Compass for database inspection

## 🆘 Need Help?

- Check README.md for detailed documentation
- Review PROJECT_SUMMARY.md for overview
- See DEPLOYMENT.md for AWS deployment

---

**You're all set! Start building! 🚀**
