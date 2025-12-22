import { useState } from "react";
import { createAccesory, uploadFile } from "../appwrite/database";
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
  const [file, setFile] = useState(null); // Estado para el archivo de imagen

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Por favor, selecciona una imagen");
    
    setLoading(true);
    try {
      // 1. Subir la imagen al Storage de Appwrite
      const fotoId = await uploadFile(file);

      if (fotoId) {
        // 2. Crear el documento usando el ID de la foto recibida
        await createAccesory({
          ...form,
          precio: Number(form.precio),
          imagen: fotoId // Guardamos el ID en el campo imagen
        });
        
        onAdd();
        // Resetear formulario
        setForm({ titulo:"", modelo:"", precio:"", descripcion:"", color:"" });
        setFile(null);
        e.target.reset(); // Limpia el input de tipo file
        alert("Producto guardado con éxito");
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
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
      
      {/* Input para el archivo real */}
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