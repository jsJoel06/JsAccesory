import { useAuth } from "../context/AuthContext";
import { login } from "../appwrite/auth";
import "../styles/login.css"; // Importa el nuevo estilo

export default function Login() {
  const { setUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const session = await login(email, password);
      
      if (session) {
        // En Appwrite, es recomendable hacer un getUser después del login exitoso
        setUser(session); 
        window.location.href = "/admin";
      }
    } catch (error) {
      alert("Email o contraseña incorrecta");
      throw error;
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Bienvenido</h2>
        <form className="login-form" onSubmit={submit}>
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            required 
          />
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}