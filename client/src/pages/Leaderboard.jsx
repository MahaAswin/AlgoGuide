import { useState, useEffect } from "react";
import API from "../services/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
    fetchAnalytics();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await API.get("/leaderboard");
      setLeaderboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await API.get("/leaderboard/analytics");
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Leaderboard</h1>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Rank</span>
          <span>Name</span>
          <span>Problems Solved</span>
        </div>
        {leaderboard.map((user, index) => (
          <div key={user.userId} style={styles.tableRow}>
            <span style={styles.rank}>{index + 1}</span>
            <span>{user.name}</span>
            <span>{user.uniqueProblems}</span>
          </div>
        ))}
      </div>

      {analytics.length > 0 && (
        <div style={styles.analytics}>
          <h2>My Topic-wise Progress</h2>
          <div style={styles.topicList}>
            {analytics.map((item) => (
              <div key={item.topic} style={styles.topicCard}>
                <span style={styles.topicName}>{item.topic}</span>
                <span style={styles.topicCount}>{item.solved} solved</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  table: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginTop: "2rem",
    overflow: "hidden",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "100px 1fr 200px",
    padding: "1rem",
    background: "#3498db",
    color: "#fff",
    fontWeight: "bold",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "100px 1fr 200px",
    padding: "1rem",
    borderBottom: "1px solid #ecf0f1",
  },
  rank: {
    fontWeight: "bold",
    color: "#3498db",
  },
  analytics: {
    marginTop: "3rem",
  },
  topicList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  topicCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  topicName: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  topicCount: {
    color: "#27ae60",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default Leaderboard;
