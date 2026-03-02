import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.page}>
      <div style={styles.gradientLayer} />

      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              <span>Mentored DSA for serious placement prep</span>
            </div>

            <h1 style={styles.title}>
              Master DSA with{" "}
              <span style={styles.titleAccent}>structured mentorship</span>,
              not random questions.
            </h1>

            <p style={styles.subtitle}>
              AlgoGuild combines a LeetCode-style problem bank with expert
              mentors, daily assessments, and topic-wise analytics so you
              actually become interview-ready.
            </p>

            {!user && (
              <div style={styles.buttonsRow}>
                <Link to="/register" style={styles.primaryBtn}>
                  Start as a student
                </Link>
                <Link to="/register?role=mentor" style={styles.secondaryBtn}>
                  Apply as mentor
                </Link>
                <Link to="/login" style={styles.ghostBtn}>
                  Sign in
                </Link>
              </div>
            )}

            {user && (
              <div style={styles.buttonsRow}>
                <Link to="/problems" style={styles.primaryBtn}>
                  Go to problem set
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" style={styles.secondaryBtn}>
                    Open admin panel
                  </Link>
                )}
              </div>
            )}

            <div style={styles.heroMetaRow}>
              <div style={styles.heroMetaPill}>
                <span style={styles.heroMetaDot} />
                Curated tracks by mentors
              </div>
              <div style={styles.heroMetaPill}>Daily assessments</div>
              <div style={styles.heroMetaPill}>Topic-wise analytics</div>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.dashboardCard}>
              <div style={styles.dashboardHeader}>
                <div>
                  <p style={styles.dashboardLabel}>Today&apos;s tasks</p>
                  <p style={styles.dashboardTitle}>Placement Track • Week 3</p>
                </div>
                <span style={styles.dashboardChip}>Mentor: @algomatrix</span>
              </div>

              <div style={styles.tasksList}>
                {[
                  {
                    title: "Two Sum with variations",
                    tag: "Arrays • Easy",
                    done: true,
                  },
                  {
                    title: "Kth smallest in BST",
                    tag: "Trees • Medium",
                    done: false,
                  },
                  {
                    title: "0/1 Knapsack (bottom-up)",
                    tag: "DP • Medium",
                    done: false,
                  },
                ].map((task) => (
                  <div key={task.title} style={styles.taskRow}>
                    <div
                      style={{
                        ...styles.taskStatus,
                        ...(task.done ? styles.taskStatusDone : {}),
                      }}
                    >
                      {task.done ? "✓" : ""}
                    </div>
                    <div style={styles.taskContent}>
                      <p style={styles.taskTitle}>{task.title}</p>
                      <p style={styles.taskTag}>{task.tag}</p>
                    </div>
                    <div style={styles.taskProgress}>
                      <span style={styles.taskProgressLabel}>
                        {task.done ? "Done" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.statsRow}>
                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Streak</p>
                  <p style={styles.statValue}>7 days</p>
                </div>
                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Solved this week</p>
                  <p style={styles.statValue}>14</p>
                </div>
                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Weak topics</p>
                  <p style={styles.statValueSm}>Trees, DP</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Structured tracks</h3>
            <p style={styles.featureText}>
              Follow mentor-designed roadmaps that start from arrays and end in
              graphs, DP, and system design—no more guessing what to do next.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Real mentors</h3>
            <p style={styles.featureText}>
              Short videos, handwritten notes, and review comments from mentors
              who have shipped real products and cleared real interviews.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Progress that matters</h3>
            <p style={styles.featureText}>
              Topic-wise analytics, streaks, and a leaderboard that tracks
              accepted submissions—not just attempts.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1f2937 0, #020617 45%, #020617 100%)",
    color: "#e5e7eb",
  },
  gradientLayer: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(circle at 100% 100%, rgba(45,212,191,0.12), transparent 55%)",
    pointerEvents: "none",
  },
  main: {
    position: "relative",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "3rem 1.25rem 4rem",
    zIndex: 1,
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.2fr)",
    gap: "3rem",
    alignItems: "center",
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "999px",
    padding: "0.35rem 0.9rem",
    border: "1px solid rgba(148,163,184,0.55)",
    backgroundColor: "rgba(15,23,42,0.8)",
    fontSize: "0.78rem",
    color: "#cbd5f5",
  },
  heroBadgeDot: {
    width: "0.4rem",
    height: "0.4rem",
    borderRadius: "999px",
    background: "#22c55e",
  },
  title: {
    fontSize: "2.6rem",
    lineHeight: 1.15,
    fontWeight: 600,
    letterSpacing: "-0.03em",
    color: "#f9fafb",
  },
  titleAccent: {
    backgroundImage: "linear-gradient(90deg,#6366f1,#22d3ee)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  subtitle: {
    fontSize: "0.95rem",
    lineHeight: 1.7,
    color: "#9ca3af",
    maxWidth: "32rem",
  },
  buttonsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  primaryBtn: {
    background: "linear-gradient(135deg,#4f46e5,#0ea5e9)",
    color: "#f9fafb",
    padding: "0.65rem 1.4rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
  },
  secondaryBtn: {
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    padding: "0.65rem 1.4rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    border: "1px solid rgba(148,163,184,0.6)",
  },
  ghostBtn: {
    background: "transparent",
    color: "#9ca3af",
    padding: "0.65rem 1.2rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "0.86rem",
    border: "1px dashed rgba(148,163,184,0.6)",
  },
  heroMetaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginTop: "0.75rem",
  },
  heroMetaPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.3rem 0.7rem",
    borderRadius: "999px",
    backgroundColor: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(55,65,81,0.8)",
    fontSize: "0.75rem",
    color: "#9ca3af",
  },
  heroMetaDot: {
    width: "0.35rem",
    height: "0.35rem",
    borderRadius: "999px",
    background: "#22c55e",
  },
  heroRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  dashboardCard: {
    position: "relative",
    width: "100%",
    maxWidth: "25rem",
    borderRadius: "1.25rem",
    padding: "1.25rem",
    background:
      "linear-gradient(145deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))",
    boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
    border: "1px solid rgba(55,65,81,0.9)",
  },
  dashboardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.1rem",
  },
  dashboardLabel: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "#6b7280",
  },
  dashboardTitle: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#e5e7eb",
    marginTop: "0.25rem",
  },
  dashboardChip: {
    fontSize: "0.7rem",
    padding: "0.25rem 0.6rem",
    borderRadius: "999px",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(55,65,81,0.9)",
    color: "#9ca3af",
  },
  tasksList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.55rem",
    marginBottom: "1rem",
  },
  taskRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: "0.65rem",
    padding: "0.55rem 0.65rem",
    borderRadius: "0.9rem",
    backgroundColor: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(31,41,55,0.9)",
  },
  taskStatus: {
    width: "1.1rem",
    height: "1.1rem",
    borderRadius: "999px",
    border: "1px solid rgba(75,85,99,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    color: "#22c55e",
  },
  taskStatusDone: {
    backgroundColor: "rgba(22,163,74,0.2)",
    borderColor: "rgba(22,163,74,0.9)",
  },
  taskContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
  },
  taskTitle: {
    fontSize: "0.8rem",
    color: "#e5e7eb",
  },
  taskTag: {
    fontSize: "0.7rem",
    color: "#9ca3af",
  },
  taskProgress: {
    fontSize: "0.7rem",
    color: "#9ca3af",
  },
  taskProgressLabel: {
    padding: "0.2rem 0.55rem",
    borderRadius: "999px",
    border: "1px solid rgba(75,85,99,0.9)",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "0.6rem",
    marginTop: "0.3rem",
  },
  statCard: {
    borderRadius: "0.85rem",
    backgroundColor: "rgba(15,23,42,0.98)",
    border: "1px solid rgba(31,41,55,0.95)",
    padding: "0.5rem 0.6rem",
  },
  statLabel: {
    fontSize: "0.65rem",
    color: "#6b7280",
    marginBottom: "0.15rem",
  },
  statValue: {
    fontSize: "0.9rem",
    color: "#e5e7eb",
    fontWeight: 500,
  },
  statValueSm: {
    fontSize: "0.8rem",
    color: "#e5e7eb",
    fontWeight: 500,
  },
  featuresSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1.2rem",
    marginTop: "3.25rem",
  },
  featureCard: {
    borderRadius: "1.1rem",
    padding: "1.15rem 1.2rem",
    backgroundColor: "rgba(15,23,42,0.96)",
    border: "1px solid rgba(31,41,55,0.95)",
    boxShadow: "0 16px 40px rgba(15,23,42,0.85)",
  },
  featureTitle: {
    fontSize: "0.95rem",
    color: "#e5e7eb",
    marginBottom: "0.3rem",
  },
  featureText: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    lineHeight: 1.6,
  },
};

export default Home;
