import { useEffect, useState } from "react";
import "../styles/home.css";

export default function ProductCard({ p }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Usamos exactamente la estructura del link que te funcionó
    if (p.$id) {
      const projectId = "69422d4b00238b380bc3";
      const bucketId = "69439a82001ead5c35ed";
      
      // Construimos la URL manual para asegurar que sea idéntica a la que probaste
      const url = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${p.$id}/view?project=${projectId}`;
      
      setImgUrl(url);
    }
  }, [p.$id]);

  return (
    <div className="card">
      <div className="card-image-container">
        <img 
          src={imgUrl || "https://placehold.co/300x300?text=Cargando..."} 
          alt={p.titulo} 
          // Importante: evita que el navegador bloquee la imagen por cabeceras
          referrerPolicy="no-referrer" 
          onError={(e) => {
            // Si falla, mostramos un error visual
            e.target.src = "https://placehold.co/300x300?text=Error+ID+No+Existe";
          }}
        />
      </div>
      
      <div className="card-content">
        <h3 className="producto-titulo">{p.titulo}</h3>
        <div className="detalles">
          <p className="modelo">Modelo: <span>{p.modelo || "General"}</span></p>
          <p className="color">Color: <span className="color-badge">{p.color || "N/A"}</span></p>
        </div>
        <div className="precio-container">
          <span className="moneda">RD$</span>
          <strong className="precio">{Number(p.precio || 0).toLocaleString()}</strong>
        </div>
        <a 
          href={`https://wa.me/18496241876?text=Hola, me interesa el ${p.titulo}`} 
          target="_blank" 
          rel="noreferrer"
          className="whatsapp-button"
        >
          <i className="fab fa-whatsapp"></i> Comprar
        </a>
      </div>
    </div>
  );
}