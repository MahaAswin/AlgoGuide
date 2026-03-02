const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { validateBody } = require("../middleware/validation_middleware");

router.post("/register", validateBody(["name", "email", "password"]), authController.register);
router.post("/login", validateBody(["email", "password"]), authController.login);

module.exports = router;