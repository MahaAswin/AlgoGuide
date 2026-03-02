const mongoose = require("mongoose");

// Validate ObjectId
exports.validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    next();
  };
};

// Validate Request Body
exports.validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(", ")}` 
      });
    }
    next();
  };
};
