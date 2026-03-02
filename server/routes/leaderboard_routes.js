const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboard_controller");
const { protect } = require("../middleware/auth_middleware");

router.get("/", protect, leaderboardController.getLeaderboard);
router.get("/analytics", protect, leaderboardController.getTopicAnalytics);

module.exports = router;
