import React, { useEffect, useState } from 'react';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

const LinksManagerModal = (props) => {
  const [show, setShow] = useState(props.show);
  const [id, setId] = useState(props.projectId ?? null)
  const [section, setSection] = useState(props.section ?? "");
  const [linkList, setLinkList] = useState(props.list ?? []);
  const [newLink, setNewLink] = useState({ id: uuidv4(),titulo: "", link: "" });
  const [editingIndex, setEditingIndex] = useState(-1); // Índice del enlace en edición

  const nameTitle = () => {
    switch (section){
      case "bibliografy":
        return "Bibliografía";
        break;
      case "laboratory":
        return "Laboratorio";
        break;
      case "production":
        return "Producciones";
        break;
      case "documentLinks":
        return "Documentación";
        break;
      
    }
  }

  const handleClose = () => props.handleHide();

  const handleSave = () => {
    props.editLinks(id, section, linkList);
    props.handleHide();
  };

  const handleAddLink = () => {
    if (newLink.titulo && newLink.link) {
      if (editingIndex === -1) {
        // Agregar nuevo enlace
        setLinkList([...linkList, newLink]);
      } else {
        // Editar enlace existente
        const updatedLinks = [...linkList];
        updatedLinks[editingIndex] = newLink;
        setLinkList(updatedLinks);
        setEditingIndex(-1);
      }
      setNewLink({id:uuidv4(), titulo: "", link: "" });
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = linkList.filter((_, i) => i !== index);
    setLinkList(updatedLinks);
    if (editingIndex === index) {
      // Cancelar la edición si el enlace en edición se elimina
      setEditingIndex(-1);
      setNewLink({id:uuidv4(), titulo: "", link: "" });
    }
  };

  const handleEditLink = (index) => {
    // Habilitar la edición de un enlace existente
    const linkToEdit = linkList[index];
    setEditingIndex(index);
    setNewLink({ id: linkToEdit.id, titulo: linkToEdit.titulo, link: linkToEdit.link });
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  useEffect(()=>{
    if(props.projectId)
    setId(props.projectId)
  },[props.projectId])

  useEffect(()=>{
    if(props.section)
    setSection(props.section)
  },[props.section])

  useEffect(()=>{
    if(props.list )
    setLinkList(props.list )
  },[props.list ])

  return (
    <div className="editFotoContainer">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Administrar Enlaces: {nameTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack spacing={2}>
          <div className="link-list-container">
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
              {linkList.map((link, index) => (
                <ListItem key={index}  id={link.id} className="link-container">
                  <ListItemText primary={link.titulo} secondary={link.link} />
                  <IconButton aria-label="Eliminar" color="error" onClick={() => handleEditLink(index)} >
                          <EditIcon  />
                    </IconButton>
                    <IconButton aria-label="Editar" color="primary" onClick={() => handleRemoveLink(index)} >
                          <DeleteIcon />
                    </IconButton>

                  {/* <Button variant="info" onClick={() => handleEditLink(index)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveLink(index)}>
                    Eliminar
                  </Button> */}
                  </ListItem>
              ))}
              </List>
            </div>
            <Stack className="link-container" direction='row' spacing={1} >
              <TextField
                type="text"
                placeholder="Título"
                value={newLink.titulo}
                onChange={(e) => setNewLink({ ...newLink, titulo: e.target.value })}
              />
              <TextField
                type="text"
                placeholder="Enlace"
                value={newLink.link}
                onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
              />
              <Button variant={editingIndex === -1 ? "success" : "info"} onClick={handleAddLink}>
                {editingIndex === -1 ? "Agregar " : "Editar "}
              </Button>
            </Stack>
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
  );
};

export default LinksManagerModal;
