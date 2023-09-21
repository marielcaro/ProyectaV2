import React, { useEffect, useState, useRef } from 'react';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';

import FotoUploader from './fotoUploader';
import { Button, Modal } from 'react-bootstrap';



const LinksManagerModal = (props) => {
    const [show, setShow] = useState(props.show);
     const [section, setSection] = useState(props.section ?? "");
     const [linkList, setLinkList] = useState(props.list ?? []);

    const handleClose = () => props.handleHide();
  
    const handleSave = () => {
        props.saveLinks(props.projectId, linkList)
        props.handleHide()
    }

   

    useEffect(()=>{
       
            setShow(props.show)
        
    },[props.show])
    return(
        <div className="editFotoContainer">
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Administrar Enlaces</Modal.Title>
        </Modal.Header>
        <Modal.Body> ¿Está seguro que desea Dar de Baja este Proyecto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default LinksManagerModal