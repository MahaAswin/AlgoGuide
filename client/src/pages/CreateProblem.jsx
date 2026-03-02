import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    topic: "Arrays",
    companies: "",
    constraints: "",
    examples: [{ input: "", output: "", explanation: "" }],
    starterCode: {
      c: "",
      cpp: "",
      python: "",
      java: "",
    },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const topics = [
    "Arrays", "Strings", "Linked List", "Stack", "Queue", "Trees",
    "Graphs", "Dynamic Programming", "Greedy", "Backtracking",
    "Binary Search", "Sorting", "Hashing", "Heap", "Trie",
    "Bit Manipulation", "Math", "Recursion"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        companies: formData.companies.split(",").map(c => c.trim()).filter(Boolean),
      };
      await API.post("/problems", payload);
      navigate("/problems");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create problem");
    }
  };

  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { input: "", output: "", explanation: "" }],
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create New Problem</h2>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Problem Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Problem Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={styles.textarea}
            rows="6"
            required
          />

          <div style={styles.row}>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              style={styles.input}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              style={styles.input}
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Companies (comma-separated): Google, Amazon, Microsoft"
            value={formData.companies}
            onChange={(e) => setFormData({ ...formData, companies: e.target.value })}
            style={styles.input}
          />

          <textarea
            placeholder="Constraints"
            value={formData.constraints}
            onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
            style={styles.textarea}
            rows="3"
          />

          <h3>Examples</h3>
          {formData.examples.map((example, idx) => (
            <div key={idx} style={styles.exampleBox}>
              <input
                type="text"
                placeholder="Input"
                value={example.input}
                onChange={(e) => {
                  const newExamples = [...formData.examples];
                  newExamples[idx].input = e.target.value;
                  setFormData({ ...formData, examples: newExamples });
                }}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Output"
                value={example.output}
                onChange={(e) => {
                  const newExamples = [...formData.examples];
                  newExamples[idx].output = e.target.value;
                  setFormData({ ...formData, examples: newExamples });
                }}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Explanation (optional)"
                value={example.explanation}
                onChange={(e) => {
                  const newExamples = [...formData.examples];
                  newExamples[idx].explanation = e.target.value;
                  setFormData({ ...formData, examples: newExamples });
                }}
                style={styles.input}
              />
            </div>
          ))}
          <button type="button" onClick={addExample} style={styles.addBtn}>
            + Add Example
          </button>

          <h3>Starter Code</h3>
          <label>C++</label>
          <textarea
            value={formData.starterCode.cpp}
            onChange={(e) => setFormData({
              ...formData,
              starterCode: { ...formData.starterCode, cpp: e.target.value }
            })}
            style={styles.codeArea}
            rows="4"
          />

          <label>C</label>
          <textarea
            value={formData.starterCode.c}
            onChange={(e) => setFormData({
              ...formData,
              starterCode: { ...formData.starterCode, c: e.target.value }
            })}
            style={styles.codeArea}
            rows="4"
          />

          <label>Python</label>
          <textarea
            value={formData.starterCode.python}
            onChange={(e) => setFormData({
              ...formData,
              starterCode: { ...formData.starterCode, python: e.target.value }
            })}
            style={styles.codeArea}
            rows="4"
          />

          <label>Java</label>
          <textarea
            value={formData.starterCode.java}
            onChange={(e) => setFormData({
              ...formData,
              starterCode: { ...formData.starterCode, java: e.target.value }
            })}
            style={styles.codeArea}
            rows="4"
          />

          <button type="submit" style={styles.button}>Create Problem</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  codeArea: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
    fontFamily: "monospace",
  },
  exampleBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    background: "#f7f7f7",
    borderRadius: "4px",
  },
  addBtn: {
    background: "#f0f0f0",
    color: "#333",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  button: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    background: "#e74c3c",
    color: "#fff",
    padding: "0.75rem",
    borderRadius: "4px",
    marginTop: "1rem",
  },
};

export default CreateProblem;
