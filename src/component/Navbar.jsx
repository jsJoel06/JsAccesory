import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../appwrite/auth";
import "../styles/navbar.css"; // Asegúrate de importar el estilo

export default function Navbar() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Lado izquierdo: Logo o nombre de la tienda */}
      <Link to="/" className="nav-logo">
        JS ACCESORY
      </Link>

      {/* Lado derecho: Enlaces */}
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        
        {user ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={handleLogout} className="logout-btn">
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}