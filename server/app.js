const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth_routes");
const problemRoutes = require("./routes/problem_routes");
const submissionRoutes = require("./routes/submission_routes");
const adminRoutes = require("./routes/admin_routes");
const leaderboardRoutes = require("./routes/leaderboard_routes");
const { protect } = require("./middleware/auth_middleware");
const { errorHandler } = require("./middleware/error_middleware");

const app = express();

// =======================
// 🔹 Global Middlewares
// =======================
app.use(cors());
app.use(express.json());

// =======================
// 🔹 Health Check Route
// =======================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AlgoGuide Backend Running 🚀",
  });
});

// =======================
// 🔹 Auth Routes
// =======================
app.use("/api/auth", authRoutes);

// =======================
// 🔹 Problem Routes
// =======================
app.use("/api/problems", problemRoutes);

// =======================
// 🔹 Submission Routes
// =======================
app.use("/api/submissions", submissionRoutes);

// =======================
// 🔹 Admin Routes
// =======================
app.use("/api/admin", adminRoutes);

// =======================
// 🔹 Leaderboard Routes
// =======================
app.use("/api/leaderboard", leaderboardRoutes);

// =======================
// 🔐 Protected Profile Route
// =======================
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});

// =======================
// 🔹 404 Handler
// =======================
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// =======================
// 🔹 Error Handler
// =======================
app.use(errorHandler);

module.exports = app;
