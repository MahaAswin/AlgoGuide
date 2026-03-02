const Submission = require("../models/submission_model");
const Problem = require("../models/problem_model");

// Simple judge for now: mark submissions as accepted and
// keep problem statistics in sync. The actual code execution
// feedback is handled by the frontend Run button via executor.
exports.createSubmission = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      code,
      language,
      status: "accepted",
    });

    // Update problem stats
    problem.totalSubmissions += 1;
    problem.totalAccepted += 1;
    // keep a simple acceptance rate
    if (problem.totalSubmissions > 0) {
      problem.acceptanceRate =
        (problem.totalAccepted / problem.totalSubmissions) * 100;
    }
    await problem.save();

    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔵 Get My Submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem", "title difficulty topic")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🟣 Get Submissions for a Problem (Admin / Mentor)
exports.getProblemSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      problem: req.params.id,
    })
      .populate("user", "name email role")
      .populate("problem", "title");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};