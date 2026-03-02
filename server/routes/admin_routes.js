const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { protect, authorize } = require("../middleware/auth_middleware");
const { validateObjectId } = require("../middleware/validation_middleware");

// All routes are admin-only
router.use(protect, authorize("admin"));

router.get("/mentors/pending", adminController.getPendingMentors);
router.put("/mentors/approve/:id", validateObjectId(), adminController.approveMentor);
router.get("/users", adminController.getAllUsers);
router.get("/stats", adminController.getDashboardStats);

module.exports = router;
