import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="brand-name">JS ACCESORY</h4>
          <p>Elevando tu estilo con los mejores accesorios. Envíos rápidos y seguros a toda la República Dominicana.</p>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📞 +1 (849) 816-1876</p>
          <p>📍 Santo Domingo, RD</p>
          <p>✉️ js@jsaccesory.com</p>
        </div>

        <div className="footer-section">
          <h4>Horario de Atención</h4>
          <p>Lunes a Sábado</p>
          <p>9:00 AM - 7:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} <strong>JS ACCESORY</strong>. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}