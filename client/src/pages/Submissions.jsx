import { useState, useEffect } from "react";
import API from "../services/api";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data } = await API.get("/submissions/my");
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>My Submissions</h1>

      <div style={styles.list}>
        {submissions.map((submission) => (
          <div key={submission._id} style={styles.card}>
            <div>
              <h3>{submission.problem?.title}</h3>
              <p style={styles.meta}>
                Language: {submission.language} | 
                Submitted: {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
            <span style={getStatusStyle(submission.status)}>
              {submission.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  let background = "#f39c12";
  if (status === "accepted") background = "#27ae60";
  else if (status === "wrong") background = "#e74c3c";
  else if (status === "runtime-error" || status === "compile-error")
    background = "#e67e22";

  return {
    ...styles.badge,
    background,
  };
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "2rem",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meta: {
    color: "#7f8c8d",
    margin: "0.5rem 0 0 0",
  },
  badge: {
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
    textTransform: "uppercase",
  },
};

export default Submissions;
