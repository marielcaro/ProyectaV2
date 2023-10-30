import React from 'react';
import './Loader.css'; // Agrega estilos CSS según tus necesidades

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader">
      {/* Aquí puedes agregar un ícono de carga */}
      <div className="spinner"></div>
      {/* O cualquier otro contenido de carga */}
    </div>
  </div>
);

export default Loader;