const Problem = require("../models/problem_model");

// 🟢 Create Problem (Admin or Approved Mentor)
exports.createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, topic } = req.body;

    // If mentor, check approval
    if (req.user.role === "mentor" && !req.user.isApproved) {
      return res.status(403).json({ message: "Mentor not approved" });
    }

    const problem = await Problem.create({
      title,
      description,
      difficulty,
      topic,
      createdBy: req.user._id,
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get All Problems (With Filters)
exports.getProblems = async (req, res) => {
  try {
    const { difficulty, topic } = req.query;

    let filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    const problems = await Problem.find(filter).populate(
      "createdBy",
      "name role"
    );

    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get Single Problem
exports.getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate(
      "createdBy",
      "name role"
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏ Update Problem (Admin Only)
exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Only allow specific fields
    const allowedFields = ["title", "description", "difficulty", "topic"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        problem[field] = req.body[field];
      }
    });

    await problem.save();

    res.json(problem);
  } catch (error) {
    console.error(error); // 🔥 important for debugging
    res.status(500).json({ message: "Server Error" });
  }
};

// 🗑 Delete Problem (Admin Only)
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await problem.deleteOne();

    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};