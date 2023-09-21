import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDateField from '../../../components/DateField/DateField';
import FotoUploader from './fotoUploader';
import { Button, Modal } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EditFotoModal = (props) => {
    const [show, setShow] = useState(props.show);
     const [foto, setFoto] = useState(null);
    const handleClose = () => props.handleHide();
  
    const handleSave = () => {
        props.editFoto(props.fotoId, foto)
        props.handleHide()
    }

    const changeFoto = (img) => {
        setFoto(img)
    }

    useEffect(()=>{
       
            setShow(props.show)
        
    },[props.show])
    return(
        <div className="editFotoContainer">
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Stack spacing={2}>
                                    <div>
                                      <p style={{marginBottom:0}}>Subí una foto para representar a tu proyecto:</p>
                                    <FotoUploader changeFoto={(img) => changeFoto(img)}/>
                                    </div>                                  
                                    
                                  </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default EditFotoModal