const mongoose = require("mongoose");
const Problem = require("../models/problem_model");
require("dotenv").config();

const placementProblems = [
  // Arrays
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    intuition: "A brute-force solution tries all pairs, but that is O(n^2). Instead, think about what information you need while scanning once from left to right. If you know the current number x, you need to know if target - x has appeared before. A hash map from number to index gives you exactly that in O(1) average time, giving an O(n) solution.",
    hints: [
      "Try the brute-force solution first: check every pair of indices (i, j). What is the time complexity?",
      "While scanning nums from left to right, for each value x consider what value you are looking for so that x + ? = target.",
      "Use a hash map from value -> index to remember numbers you have already seen. Before inserting nums[i], check if target - nums[i] is already in the map.",
    ],
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        isHidden: false,
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        isHidden: false,
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        isHidden: true,
      },
    ],
    videos: [
      {
        title: "Two Sum – HashMap pattern explained",
        url: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
      },
      {
        title: "Two Sum – Step-by-step Java solution",
        url: "https://www.youtube.com/watch?v=UXDSeD9mN-k",
      },
    ],
    starterCode: {
      c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your code here\n}",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}"
    }
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    difficulty: "easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Bloomberg"],
    intuition: "You want to buy at a low price and sell later at a high price. As you scan prices from left to right, keep track of the minimum price seen so far and the best profit you could achieve by selling today. This leads to a single pass, O(n) solution.",
    hints: [
      "The buy day must come before the sell day. Avoid checking all pairs of days naively (that is O(n^2)).",
      "As you move from left to right, maintain the minimum price you have seen so far.",
      "At each day i, compute the profit if you bought at the minimum price so far and sold today. Keep track of the maximum such profit.",
    ],
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n    }\n}",
      c: "int maxProfit(int* prices, int pricesSize) {\n    // Write your code here\n}"
    }
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "medium",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Apple", "LinkedIn"],
    intuition: "This is the classic Kadane's algorithm problem. The key idea is that a subarray with negative sum can never help a future subarray, so you reset the running sum when it becomes negative.",
    hints: [
      "A brute-force approach checks all subarrays and sums them, which is O(n^2). Can you do better using a running sum?",
      "As you iterate, keep a running sum. If it ever becomes negative, starting a new subarray at the next index is always better than keeping the negative sum.",
      "Track both the current best running sum and the global maximum over all positions.",
    ],
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your code here\n    }\n}",
      c: "int maxSubArray(int* nums, int numsSize) {\n    // Write your code here\n}"
    }
  },
  
  // Strings
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "easy",
    topic: "Strings",
    companies: ["Google", "Amazon", "Facebook", "Microsoft"],
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    examples: [
      {
        input: "s = \"()\"",
        output: "true",
        explanation: "The string is valid."
      },
      {
        input: "s = \"()[]{}\"",
        output: "true",
        explanation: "All brackets are properly closed."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n    }\n}",
      c: "bool isValid(char* s) {\n    // Write your code here\n}"
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    topic: "Strings",
    companies: ["Amazon", "Google", "Microsoft", "Adobe"],
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n    }\n}",
      c: "int lengthOfLongestSubstring(char* s) {\n    // Write your code here\n}"
    }
  },

  // Linked List
  {
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "easy",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    constraints: "The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "Reverse the linked list."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n    }\n}",
      c: "struct ListNode* reverseList(struct ListNode* head) {\n    // Write your code here\n}"
    }
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    difficulty: "easy",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Adobe", "Apple"],
    constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merge both sorted lists."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n    }\n}",
      c: "struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {\n    // Write your code here\n}"
    }
  },

  // Trees
  {
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: "easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "LinkedIn", "Facebook"],
    constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "The maximum depth is 3."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your code here\n    }\n}",
      c: "int maxDepth(struct TreeNode* root) {\n    // Write your code here\n}"
    }
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Google"],
    constraints: "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder traversal: left, root, right."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write your code here\n    }\n}",
      c: "int* inorderTraversal(struct TreeNode* root, int* returnSize) {\n    // Write your code here\n}"
    }
  },

  // Dynamic Programming
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "easy",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Adobe", "Microsoft"],
    constraints: "1 <= n <= 45",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1+1 or 2."
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1+1+1, 1+2, or 2+1."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n    }\n}",
      c: "int climbStairs(int n) {\n    // Write your code here\n}"
    }
  },
  {
    title: "Longest Common Subsequence",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
    difficulty: "medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    constraints: "1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.",
    examples: [
      {
        input: "text1 = \"abcde\", text2 = \"ace\"",
        output: "3",
        explanation: "The longest common subsequence is \"ace\" and its length is 3."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write your code here\n    }\n}",
      c: "int longestCommonSubsequence(char* text1, char* text2) {\n    // Write your code here\n}"
    }
  },

  // Binary Search
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "easy",
    topic: "Binary Search",
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n    }\n}",
      c: "int search(int* nums, int numsSize, int target) {\n    // Write your code here\n}"
    }
  },

  // Graphs
  {
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    difficulty: "medium",
    topic: "Graphs",
    companies: ["Amazon", "Microsoft", "Facebook", "Google"],
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    examples: [
      {
        input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        output: "3",
        explanation: "There are 3 islands in the grid."
      }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your code here\n    }\n};",
      python: "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        # Write your code here\n        pass",
      java: "class Solution {\n    public int numIslands(char[][] grid) {\n        // Write your code here\n    }\n}",
      c: "int numIslands(char** grid, int gridSize, int* gridColSize) {\n    // Write your code here\n}"
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Problem.deleteMany({});
    console.log("Cleared existing problems");

    await Problem.insertMany(placementProblems);
    console.log(`Seeded ${placementProblems.length} placement problems`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
