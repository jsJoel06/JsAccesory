import { useState } from "react";
// Importamos la función unificada que creamos en database.js
import { createProductWithImage } from "../appwrite/database"; 
import '../styles/admin.css'

export default function AdminProductForm({ onAdd }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    modelo: "",
    precio: "",
    descripcion: "",
    color: "",
  });
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Por favor, selecciona una imagen");
    
    setLoading(true);
    try {
      // Usamos la nueva función que hace todo en un solo paso
      // Le pasamos los datos y el archivo
      const dataForAppwrite = {
        ...form,
        precio: Number(form.precio),
      };

      await createProductWithImage(dataForAppwrite, file);
      
      // Si llegamos aquí, todo salió bien
      onAdd();
      setForm({ titulo:"", modelo:"", precio:"", descripcion:"", color:"" });
      setFile(null);
      e.target.reset(); 
      alert("Producto e imagen guardados con éxito con ID compartido");
      
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el producto. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>Nuevo Accesorio</h3>
      <input placeholder="Título" value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})} required/>
      <input placeholder="Modelo" value={form.modelo} onChange={e=>setForm({...form,modelo:e.target.value})} required/>
      <input placeholder="Precio" type="number" value={form.precio} onChange={e=>setForm({...form,precio:e.target.value})} required/>
      <input placeholder="Color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} />
      
      <div className="file-input">
        <label>Foto del producto:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setFile(e.target.files[0])} 
          required
        />
      </div>

      <textarea placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})} />
      
      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Guardar Producto"}
      </button>
    </form>
  );
}