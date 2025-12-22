import { useEffect, useState } from "react";
import { listAccesories } from "../appwrite/database";
import ProductCard from "../component/ProductCard";
import '../styles/home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    listAccesories()
      .then(r => {
        setProducts(r.documents || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // Lógica de filtrado
  const filteredProducts = products.filter(p => 
    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="empty-message">Cargando catálogo...</div>;

  return (
    <main className="home-container">
      {/* Título original solicitado */}
      <h1 className="home-title">Explora nuestra Colección</h1>
      
      {/* Barra de búsqueda integrada */}
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por accesorio, modelo o color..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="results-text">
            Mostrando {filteredProducts.length} resultados para "{searchTerm}"
          </p>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(p => <ProductCard key={p.$id} p={p} />)}
        </div>
      ) : (
        <div className="empty-message">
          <p>No se encontraron coincidencias para tu búsqueda.</p>
          <button onClick={() => setSearchTerm("")} className="reset-btn">
            Ver catálogo completo
          </button>
        </div>
      )}
    </main>
  );
}