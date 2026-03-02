import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate("/problems");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register for AlgoGuild</h2>
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={styles.input}
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={styles.input}
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        
        <p style={styles.text}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    background: "#e74c3c",
    color: "#fff",
    padding: "0.75rem",
    borderRadius: "4px",
    marginTop: "1rem",
  },
  text: {
    marginTop: "1rem",
    textAlign: "center",
  },
};

export default Register;
