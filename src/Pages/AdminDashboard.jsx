import { useEffect, useState } from "react";
import { listAccesories, deleteAccesory } from "../appwrite/database";
import AdminProductForm from "../component/AdminProductForm";


export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const load = () => {
    listAccesories()
      .then(r => {
        if (r && r.documents) setProducts(r.documents);
        else setProducts([]);
      })
      .catch(() => setProducts([]));
  };

  useEffect(load, []);

  return (
    <div className="admin-container">
      <h2>Panel de Admin</h2>
      <AdminProductForm onAdd={load} />
      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="admin-list">
          {products.map(p => (
            <div className="admin-item" key={p.$id}>
              <div>{p.titulo}</div>
              <button onClick={() => deleteAccesory(p.$id).then(load)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
