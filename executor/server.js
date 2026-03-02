const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const TEMP_DIR = path.join(__dirname, "temp");

// Ensure temp directory exists
fs.mkdir(TEMP_DIR, { recursive: true });

// Execute code endpoint
app.post("/execute", async (req, res) => {
  const { code, language, testCases } = req.body;
  const executionId = uuidv4();

  try {
    let result;
    
    switch (language) {
      case "javascript":
        result = await executeJavaScript(code, testCases, executionId);
        break;
      case "python":
        result = await executePython(code, testCases, executionId);
        break;
      case "java":
        result = await executeJava(code, testCases, executionId);
        break;
      case "cpp":
        result = await executeCpp(code, testCases, executionId);
        break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    // Cleanup temp files
    await cleanupFiles(executionId);
  }
});

// JavaScript execution
async function executeJavaScript(code, testCases, executionId) {
  const filePath = path.join(TEMP_DIR, `${executionId}.js`);
  await fs.writeFile(filePath, code);

  return new Promise((resolve) => {
    exec(`node ${filePath}`, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ status: "error", output: stderr || error.message });
      } else {
        resolve({ status: "success", output: stdout });
      }
    });
  });
}

// Python execution
async function executePython(code, testCases, executionId) {
  const filePath = path.join(TEMP_DIR, `${executionId}.py`);
  await fs.writeFile(filePath, code);

  return new Promise((resolve) => {
    exec(`python ${filePath}`, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ status: "error", output: stderr || error.message });
      } else {
        resolve({ status: "success", output: stdout });
      }
    });
  });
}

// Java execution
async function executeJava(code, testCases, executionId) {
  const filePath = path.join(TEMP_DIR, `${executionId}.java`);
  await fs.writeFile(filePath, code);

  return new Promise((resolve) => {
    exec(
      `javac ${filePath} && java -cp ${TEMP_DIR} ${executionId}`,
      { timeout: 10000 },
      (error, stdout, stderr) => {
        if (error) {
          resolve({ status: "error", output: stderr || error.message });
        } else {
          resolve({ status: "success", output: stdout });
        }
      }
    );
  });
}

// C++ execution
async function executeCpp(code, testCases, executionId) {
  const filePath = path.join(TEMP_DIR, `${executionId}.cpp`);
  const outputPath = path.join(TEMP_DIR, executionId);
  await fs.writeFile(filePath, code);

  return new Promise((resolve) => {
    exec(
      `g++ ${filePath} -o ${outputPath} && ${outputPath}`,
      { timeout: 10000 },
      (error, stdout, stderr) => {
        if (error) {
          resolve({ status: "error", output: stderr || error.message });
        } else {
          resolve({ status: "success", output: stdout });
        }
      }
    );
  });
}

// Cleanup temp files
async function cleanupFiles(executionId) {
  try {
    const files = await fs.readdir(TEMP_DIR);
    const filesToDelete = files.filter((file) => file.startsWith(executionId));
    
    await Promise.all(
      filesToDelete.map((file) => fs.unlink(path.join(TEMP_DIR, file)))
    );
  } catch (error) {
    console.error("Cleanup error:", error);
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Code Executor running on port ${PORT}`);
});
