const User = require("../models/user_model");
const Problem = require("../models/problem_model");
const Submission = require("../models/submission_model");

// Get all pending mentors
exports.getPendingMentors = async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: "mentor", 
      isApproved: false 
    }).select("-password");

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve mentor
exports.approveMentor = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({ message: "User not found" });
    }

    if (mentor.role !== "mentor") {
      return res.status(400).json({ message: "User is not a mentor" });
    }

    mentor.isApproved = true;
    await mentor.save();

    res.json({ message: "Mentor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProblems, totalSubmissions, pendingMentors] = await Promise.all([
      User.countDocuments(),
      Problem.countDocuments(),
      Submission.countDocuments(),
      User.countDocuments({ role: "mentor", isApproved: false })
    ]);

    res.json({
      totalUsers,
      totalProblems,
      totalSubmissions,
      pendingMentors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
