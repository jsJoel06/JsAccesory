import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        {/* El Navbar siempre arriba */}
        <Navbar />

        {/* El contenedor de las rutas cambia el contenido del medio */}
        <div style={{ minHeight: '80vh' }}> {/* Esto asegura que el footer no flote en medio de la pantalla si hay poco contenido */}
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
            {/* Borra la ruta de /footer, ya no es necesaria */}
          </Routes>
        </div>

        {/* EL FOOTER VA AQUÍ: Fuera de Routes para que sea global */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}