import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./component/Footer";

export default function App() {
  return (
    <AuthProvider>
      {/* HashRouter añade un '#' a la URL, evitando que Render busque carpetas físicas */}
      <Router> 
        <Navbar />

        <div style={{ minHeight: '80vh' }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
}