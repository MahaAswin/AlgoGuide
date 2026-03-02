const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    topic: {
      type: String,
      required: true,
      enum: [
        "Arrays",
        "Strings",
        "Linked List",
        "Stack",
        "Queue",
        "Trees",
        "Graphs",
        "Dynamic Programming",
        "Greedy",
        "Backtracking",
        "Binary Search",
        "Sorting",
        "Hashing",
        "Heap",
        "Trie",
        "Bit Manipulation",
        "Math",
        "Recursion"
      ],
    },
    companies: [{
      type: String,
    }],
    intuition: {
      type: String,
    },
    hints: [{
      type: String,
    }],
    videos: [{
      title: String,
      url: String,
    }],
    constraints: {
      type: String,
    },
    examples: [{
      input: String,
      output: String,
      explanation: String,
    }],
    testCases: [{
      input: String,
      output: String,
      isHidden: { type: Boolean, default: false },
    }],
    starterCode: {
      c: String,
      cpp: String,
      python: String,
      java: String,
    },
    acceptanceRate: {
      type: Number,
      default: 0,
    },
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    totalAccepted: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Indexes for performance
problemSchema.index({ difficulty: 1 });
problemSchema.index({ topic: 1 });
problemSchema.index({ createdBy: 1 });
problemSchema.index({ companies: 1 });

module.exports = mongoose.model("Problem", problemSchema);