const Submission = require("../models/submission_model");

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Submission.aggregate([
      { $match: { status: "accepted" } },
      {
        $group: {
          _id: "$user",
          solvedCount: { $sum: 1 },
          problems: { $addToSet: "$problem" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$userInfo.name",
          email: "$userInfo.email",
          solvedCount: 1,
          uniqueProblems: { $size: "$problems" }
        }
      },
      { $sort: { uniqueProblems: -1, solvedCount: -1 } },
      { $limit: 100 }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get topic-wise analytics for a user
exports.getTopicAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const analytics = await Submission.aggregate([
      { $match: { user: userId, status: "accepted" } },
      {
        $lookup: {
          from: "problems",
          localField: "problem",
          foreignField: "_id",
          as: "problemInfo"
        }
      },
      { $unwind: "$problemInfo" },
      {
        $group: {
          _id: "$problemInfo.topic",
          solved: { $sum: 1 },
          problems: { $addToSet: "$problem" }
        }
      },
      {
        $project: {
          topic: "$_id",
          solved: { $size: "$problems" },
          _id: 0
        }
      },
      { $sort: { solved: -1 } }
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
