import { useEffect, useState } from "react";
import { getFilePreview } from "../appwrite/database";
import "../styles/home.css";

export default function ProductCard({ p }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Generamos la URL y la guardamos en el estado
    const url = getFilePreview(p.imagen);
    setImgUrl(url);
  }, [p.imagen]);

  return (
    <div className="card">
      <div className="card-image-container">
        <img 
          src={imgUrl || "https://via.placeholder.com/300?text=Cargando..."} 
          alt={p.titulo} 
          onError={(e) => {
            console.error("Error cargando imagen para:", p.titulo, "URL intentada:", imgUrl);
            e.target.src = "https://via.placeholder.com/300?text=Error+al+Cargar";
          }}
        />
      </div>
      
      <div className="card-content">
        <h3>{p.titulo}</h3>
        <p className="modelo">Modelo: <span>{p.modelo}</span></p>
        <p className="color">Color: <span className="color-badge">{p.color}</span></p>
        
        <strong className="precio">RD$ {Number(p.precio).toLocaleString()}</strong>
        
        <p className="descripcion-corta">{p.descripcion}</p>
        
        <a 
          href={`https://wa.me/18496241876?text=Hola JS ACCESORY, me interesa el ${p.titulo} para el modelo ${p.modelo}`} 
          target="_blank" 
          rel="noreferrer"
          className="whatsapp-button"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  );
}