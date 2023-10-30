import React, { useEffect, useState, useRef } from 'react';
import './projectsContainerPage.css';

import { Button, Modal } from 'react-bootstrap';

const DeleteModal = (props) => {
    const [show, setShow] = useState(props.show);
     
    const handleClose = () => props.handleHide();
  
    const handleSave = () => {
        props.deleteData(props.projectId)
        props.handleHide()
    }

   

    useEffect(()=>{
       
            setShow(props.show)
        
    },[props.show])
    return(
        <div className="editFotoContainer">
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Está seguro que desea Dar de Baja este Proyecto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default DeleteModal