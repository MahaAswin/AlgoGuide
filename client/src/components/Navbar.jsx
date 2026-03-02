import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.navShell}>
        <div style={styles.left}>
          <Link to="/" style={styles.brand}>
            <div style={styles.brandIcon}>A</div>
            <div style={styles.brandText}>
              <span style={styles.brandTitle}>AlgoGuild</span>
              <span style={styles.brandSubtitle}>Mentored DSA platform</span>
            </div>
          </Link>
        </div>

        <nav style={styles.center}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          {user && (
            <>
              <Link to="/problems" style={styles.navLink}>
                Problems
              </Link>
              <Link to="/leaderboard" style={styles.navLink}>
                Leaderboard
              </Link>
              {user.role === "student" && (
                <Link to="/submissions" style={styles.navLink}>
                  My Submissions
                </Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" style={styles.navLink}>
                  Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div style={styles.right}>
          {user ? (
            <>
              <span style={styles.userPill}>
                <span style={styles.userRole}>{user.role}</span>
                <span style={styles.userName}>{user.name}</span>
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
              <Link to="/register" style={styles.ctaBtn}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backdropFilter: "blur(20px)",
    background:
      "linear-gradient(to bottom, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    borderBottom: "1px solid rgba(30,64,175,0.6)",
  },
  navShell: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0.6rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    color: "#e5e7eb",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    textDecoration: "none",
    color: "inherit",
  },
  brandIcon: {
    width: "2.1rem",
    height: "2.1rem",
    borderRadius: "0.9rem",
    backgroundImage: "linear-gradient(135deg,#4f46e5,#22d3ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "1rem",
    boxShadow: "0 16px 40px rgba(15,23,42,0.9)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1,
  },
  brandTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  brandSubtitle: {
    fontSize: "0.7rem",
    color: "#9ca3af",
  },
  center: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "0.8rem",
  },
  navLink: {
    color: "#9ca3af",
    textDecoration: "none",
    padding: "0.25rem 0.4rem",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  userPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.3rem 0.7rem",
    borderRadius: "999px",
    backgroundColor: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(55,65,81,0.9)",
    fontSize: "0.78rem",
  },
  userRole: {
    textTransform: "capitalize",
    color: "#a5b4fc",
    fontWeight: 500,
  },
  userName: {
    color: "#e5e7eb",
  },
  logoutBtn: {
    borderRadius: "999px",
    padding: "0.3rem 0.9rem",
    border: "1px solid rgba(239,68,68,0.7)",
    backgroundColor: "transparent",
    color: "#fecaca",
    fontSize: "0.78rem",
    cursor: "pointer",
  },
  ctaBtn: {
    borderRadius: "999px",
    padding: "0.4rem 0.9rem",
    backgroundImage: "linear-gradient(135deg,#4f46e5,#22d3ee)",
    color: "#f9fafb",
    fontSize: "0.8rem",
    textDecoration: "none",
    boxShadow: "0 14px 32px rgba(15,23,42,0.8)",
  },
};

export default Navbar;
