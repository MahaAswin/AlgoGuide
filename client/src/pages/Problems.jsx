import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState({ difficulty: "", topic: "" });
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const { user } = useContext(AuthContext);

  const topics = [
    "Arrays", "Strings", "Linked List", "Stack", "Queue", "Trees", 
    "Graphs", "Dynamic Programming", "Greedy", "Backtracking", 
    "Binary Search", "Sorting", "Hashing", "Heap", "Trie", 
    "Bit Manipulation", "Math", "Recursion"
  ];

  useEffect(() => {
    fetchProblems();
    if (user?.role === "student") fetchSolvedProblems();
  }, [filter]);

  const fetchProblems = async () => {
    try {
      const params = {};
      if (filter.difficulty) params.difficulty = filter.difficulty;
      if (filter.topic) params.topic = filter.topic;
      
      const { data } = await API.get("/problems", { params });
      setProblems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSolvedProblems = async () => {
    try {
      const { data } = await API.get("/submissions/my");
      const solved = new Set(
        data.filter(s => s.status === "accepted").map(s => s.problem._id)
      );
      setSolvedProblems(solved);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Problems</h1>
        {(user?.role === "admin" || user?.role === "mentor") && (
          <Link to="/problems/create" style={styles.createBtn}>+ New Problem</Link>
        )}
      </div>

      <div style={styles.filters}>
        <select
          value={filter.difficulty}
          onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
          style={styles.select}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={filter.topic}
          onChange={(e) => setFilter({ ...filter, topic: e.target.value })}
          style={styles.select}
        >
          <option value="">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Status</th>
              <th style={{...styles.th, textAlign: "left"}}>Title</th>
              <th style={styles.th}>Acceptance</th>
              <th style={styles.th}>Difficulty</th>
              <th style={styles.th}>Topic</th>
              <th style={styles.th}>Companies</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id} style={styles.tableRow}>
                <td style={styles.td}>
                  {solvedProblems.has(problem._id) && (
                    <span style={styles.checkmark}>✓</span>
                  )}
                </td>
                <td style={{...styles.td, textAlign: "left"}}>
                  <Link to={`/problems/${problem._id}`} style={styles.problemLink}>
                    {problem.title}
                  </Link>
                </td>
                <td style={styles.td}>
                  {problem.acceptanceRate > 0 
                    ? `${problem.acceptanceRate.toFixed(1)}%` 
                    : "N/A"}
                </td>
                <td style={styles.td}>
                  <span style={getDifficultyStyle(problem.difficulty)}>
                    {problem.difficulty}
                  </span>
                </td>
                <td style={styles.td}>{problem.topic}</td>
                <td style={styles.td}>
                  <div style={styles.companies}>
                    {problem.companies?.slice(0, 3).map((company, idx) => (
                      <span key={idx} style={styles.companyTag}>{company}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getDifficultyStyle = (difficulty) => ({
  ...styles.badge,
  color: difficulty === "easy" ? "#00b8a3" : difficulty === "medium" ? "#ffc01e" : "#ef4743",
  fontWeight: "600",
});

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  createBtn: {
    background: "#3498db",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "500",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },
  select: {
    padding: "0.5rem 1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#fff",
    fontSize: "0.95rem",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "#f7f7f7",
    borderBottom: "2px solid #e0e0e0",
  },
  th: {
    padding: "1rem",
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
    fontSize: "0.9rem",
  },
  tableRow: {
    borderBottom: "1px solid #f0f0f0",
  },
  td: {
    padding: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  checkmark: {
    color: "#00b8a3",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  problemLink: {
    color: "#2c3e50",
    textDecoration: "none",
    fontWeight: "500",
  },
  badge: {
    fontSize: "0.85rem",
    textTransform: "capitalize",
  },
  companies: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  companyTag: {
    background: "#f0f0f0",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    color: "#666",
  },
};

export default Problems;
