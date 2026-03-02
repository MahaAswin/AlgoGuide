const express = require("express");
const router = express.Router();

const submissionController = require("../controllers/submission_controller");
const { protect, authorize } = require("../middleware/auth_middleware");
const { validateObjectId, validateBody } = require("../middleware/validation_middleware");

// Student submits solution
router.post(
  "/",
  protect,
  authorize("student"),
  validateBody(["problemId", "code", "language"]),
  submissionController.createSubmission
);

// Get my submissions
router.get(
  "/my",
  protect,
  authorize("student"),
  submissionController.getMySubmissions
);

// Admin / Mentor view submissions for a problem
router.get(
  "/problem/:id",
  protect,
  authorize("admin", "mentor"),
  validateObjectId(),
  submissionController.getProblemSubmissions
);

module.exports = router;