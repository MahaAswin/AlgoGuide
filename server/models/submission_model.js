const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["c", "cpp", "python", "java"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "wrong_answer", "runtime_error", "time_limit_exceeded"],
      default: "pending",
    },
    runtime: {
      type: Number,
    },
    memory: {
      type: Number,
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for performance
submissionSchema.index({ user: 1, createdAt: -1 });
submissionSchema.index({ problem: 1 });
submissionSchema.index({ status: 1 });

module.exports = mongoose.model("Submission", submissionSchema);