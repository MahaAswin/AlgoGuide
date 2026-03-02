import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import CreateProblem from "./pages/CreateProblem";
import Submissions from "./pages/Submissions";
import Leaderboard from "./pages/Leaderboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/problems/:id"
            element={
              <ProtectedRoute>
                <ProblemDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/problems/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "mentor"]}>
                <CreateProblem />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/submissions"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Submissions />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
