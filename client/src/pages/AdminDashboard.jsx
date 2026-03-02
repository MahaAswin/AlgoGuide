import { useState, useEffect } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingMentors, setPendingMentors] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchPendingMentors();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingMentors = async () => {
    try {
      const { data } = await API.get("/admin/mentors/pending");
      setPendingMentors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveMentor = async (id) => {
    try {
      await API.put(`/admin/mentors/approve/${id}`);
      fetchPendingMentors();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      {stats && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Total Users</h3>
            <p style={styles.statNumber}>{stats.totalUsers}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Total Problems</h3>
            <p style={styles.statNumber}>{stats.totalProblems}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Total Submissions</h3>
            <p style={styles.statNumber}>{stats.totalSubmissions}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Pending Mentors</h3>
            <p style={styles.statNumber}>{stats.pendingMentors}</p>
          </div>
        </div>
      )}

      <div style={styles.section}>
        <h2>Pending Mentor Approvals</h2>
        {pendingMentors.length === 0 ? (
          <p>No pending mentor approvals</p>
        ) : (
          <div style={styles.list}>
            {pendingMentors.map((mentor) => (
              <div key={mentor._id} style={styles.card}>
                <div>
                  <h3>{mentor.name}</h3>
                  <p style={styles.email}>{mentor.email}</p>
                </div>
                <button
                  onClick={() => approveMentor(mentor._id)}
                  style={styles.approveBtn}
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  },
  statCard: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#3498db",
    margin: "1rem 0 0 0",
  },
  section: {
    marginTop: "3rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
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
  email: {
    color: "#7f8c8d",
    margin: "0.5rem 0 0 0",
  },
  approveBtn: {
    background: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
