// Crear un componente Modal para mostrar la información detallada del integrante
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const MemberDetailsModal = ({ show, onHide, perfilId }) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiEndpoint}/Perfil/GetPerfilInformationTeam?perfilId=${perfilId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemberDetails(response.data);
      } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al obtener detalles del miembro:', error);
      }
    };

    if (perfilId) {
      fetchMemberDetails();
    }
  }, [perfilId]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del integrante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mostrar los detalles del integrante */}
        {memberDetails && (
          <div>
            <p>Nombre: <b>{memberDetails.nombreCompleto}</b> </p>
            <p>Email: <b>{memberDetails.email}</b></p>
            <p>Carrera Profesional: <b>{memberDetails.carreraProfesional}</b></p>
            <p>Principal Área de Investigación: <b>{memberDetails.principalArea}</b></p>
            <p>Último grado alcanzado:<b> {memberDetails.categoria}</b> </p>

            {/* Agregar más detalles según la estructura de los datos devueltos por la API */}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MemberDetailsModal;