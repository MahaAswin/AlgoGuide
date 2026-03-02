# 🚀 AlgoGuild - LeetCode Style Setup Guide

## ✨ What's New

### LeetCode-Style Features
- ✅ 15+ Placement Problems (Arrays, Strings, Trees, DP, Graphs, etc.)
- ✅ Company Tags (Google, Amazon, Microsoft, Facebook, etc.)
- ✅ Acceptance Rate Tracking
- ✅ 4 Languages: C, C++, Python, Java
- ✅ Starter Code Templates
- ✅ Examples with Explanations
- ✅ Constraints Section
- ✅ Split-Screen Code Editor
- ✅ Submission History
- ✅ Status Tracking (Accepted, Wrong Answer, etc.)

## 🎯 Quick Start

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Setup Environment

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/algoguild
JWT_SECRET=your-secret-key-12345
NODE_ENV=development
```

### 3. Seed Database with Problems

```bash
cd server
npm run seed
```

This will add 15+ placement problems including:
- **Arrays**: Two Sum, Best Time to Buy/Sell Stock, Maximum Subarray
- **Strings**: Valid Parentheses, Longest Substring Without Repeating
- **Linked List**: Reverse Linked List, Merge Two Sorted Lists
- **Trees**: Maximum Depth, Inorder Traversal
- **Dynamic Programming**: Climbing Stairs, Longest Common Subsequence
- **Binary Search**: Binary Search
- **Graphs**: Number of Islands

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Access Application

Open http://localhost:5173

## 🧪 Test the Platform

### 1. Register as Student
- Go to Register
- Name: Test Student
- Email: student@test.com
- Password: student123
- Role: Student

### 2. Browse Problems
- Click "Problems" in navbar
- Filter by difficulty or topic
- See company tags and acceptance rates

### 3. Solve a Problem
- Click on "Two Sum"
- Read description, examples, constraints
- Select language (C++, C, Python, Java)
- Write code in editor
- Click Submit

### 4. View Submissions
- Click "Submissions" tab in problem page
- See your submission history with status

### 5. Check Leaderboard
- Navigate to Leaderboard
- View rankings based on solved problems

## 📊 DSA Topics Covered

1. **Arrays** - Two Sum, Stock Buy/Sell, Maximum Subarray
2. **Strings** - Valid Parentheses, Longest Substring
3. **Linked List** - Reverse List, Merge Lists
4. **Stack** - Valid Parentheses
5. **Trees** - Max Depth, Inorder Traversal
6. **Graphs** - Number of Islands
7. **Dynamic Programming** - Climbing Stairs, LCS
8. **Binary Search** - Binary Search
9. **Greedy** - Stock Buy/Sell
10. **Recursion** - Tree problems

## 🏢 Companies Featured

- Google
- Amazon
- Microsoft
- Facebook
- Apple
- LinkedIn
- Adobe
- Goldman Sachs
- Bloomberg

## 🎨 UI Features

### Problems Page
- Table view like LeetCode
- Status column (✓ for solved)
- Acceptance rate
- Difficulty badges (Easy/Medium/Hard)
- Company tags
- Topic filters

### Problem Detail Page
- Split-screen layout
- Left: Description, Examples, Constraints
- Right: Code Editor
- Language selector
- Submit button
- Submissions tab

### Code Editor
- Syntax highlighting ready
- Starter code templates
- Language switching
- Full-screen editing

## 🔧 Admin Features

### Create New Problem
- Login as admin
- Click "+ New Problem"
- Fill in:
  - Title, Description
  - Difficulty, Topic
  - Companies (comma-separated)
  - Constraints
  - Examples (multiple)
  - Starter code for all 4 languages

## 📈 Tracking & Analytics

- Total submissions per problem
- Acceptance rate calculation
- User-wise solved problems
- Topic-wise progress
- Leaderboard rankings

## 🎯 Next Steps

1. ✅ Test all 15+ problems
2. ✅ Submit solutions in different languages
3. ✅ Check leaderboard updates
4. ✅ Add more problems as admin
5. ✅ Customize UI colors/themes

## 💡 Tips

- Use C++ for competitive programming
- Python for quick prototyping
- Java for enterprise-style solutions
- C for low-level understanding

## 🐛 Troubleshooting

### No problems showing?
```bash
cd server
npm run seed
```

### Language not working?
Check that starter code is provided for that language

### Submission not updating?
Refresh the page or check backend logs

---

**You now have a production-ready LeetCode-style platform! 🎉**
