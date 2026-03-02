const express = require("express");
const router = express.Router();

const problemController = require("../controllers/problem_controller");
const { protect, authorize } = require("../middleware/auth_middleware");
const { validateObjectId, validateBody } = require("../middleware/validation_middleware");

// Create Problem → Only admin or mentor
router.post(
  "/",
  protect,
  authorize("admin", "mentor"),
  validateBody(["title", "description", "difficulty", "topic"]),
  problemController.createProblem
);

// Get Problems → Anyone logged in
router.get("/", protect, problemController.getProblems);

// Get Single Problem → Anyone logged in
router.get("/:id", protect, validateObjectId(), problemController.getProblem);

// Update Problem → Admin only
router.put(
  "/:id",
  protect,
  authorize("admin"),
  validateObjectId(),
  problemController.updateProblem
);

// Delete Problem → Admin only
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  validateObjectId(),
  problemController.deleteProblem
);

module.exports = router;    