import React, { useEffect, useState } from 'react';
import './membersListPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

const MembersListPage = (props) => {
    const [allMembers, setAllMembers] = useState(props.members);
    const [editingName, setEditingName] = useState("");
    const [newRole, setNewRole] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [memberToRemoveIndex, setMemberToRemoveIndex] = useState(-1);
    const [showEditRole, setShowEditRole] = useState(false);
    const [memberToEditIndex, setMemberToEditIndex] = useState(-1);
    const [showAddMember, setShowAddMember] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const allUsers = [
        { id: 10 , label: 'Ignacio Manrique' },
        { id: 20, label: 'Ramiro Palferro'},
        { id: 30, label: 'Leandro Skyrim' },
        { id: 40, label: 'Gonzalo Certo' },
        { id: 50, label: 'Elías Remedi' },
        { id: 60, label: "Lourdes Gouyot" },
        { id: 70, label: 'Belén Velásquez'},
    ]

    const allMembersEmails = [
        { id: 10 , label: 'ignacio.manrique@gmail.com' },
        { id: 20, label: 'Ramiro.Palferro@gmail.com'},
        { id: 30, label: 'Leandro.Skyrim@gmail.com' },
        { id: 40, label: 'Gonzalo.Certo@gmail.com' },
        { id: 50, label: 'Elias.Remedi@gmail.com' },
        { id: 60, label: "Lourdes.Gouyot@gmail.com" },
        { id: 70, label: 'Belen.Velasquez@gmail.com'},
    ]

    const getNameEditingRole = (id) => {
      
        if(allMembers[id]?.label ) {
          return (allMembers[id].label )}
        else {
            return "";
        }
         
    }

    const handleCloseAddMember = () => {
        setShowAddMember(false);
      };
      
      const handleConfirmAddMember = () => {
        // Agrega al nuevo integrante a la lista
        const newMember = {
          userId: selectedName.id,
          label: selectedName.label,
          role: selectedRole,
        };
        const updatedMembers = [...allMembers, newMember];
        setAllMembers(updatedMembers);
      
        // Cierra la ventana modal de agregar integrante
        setShowAddMember(false);
        // Limpia los campos de entrada del nuevo integrante
        setSelectedName("");
        setSelectedRole("");
        
      };

    const handleCloseEditRole = () => {
        setShowEditRole(false);
        setNewRole(""); // Limpia el campo de entrada del nuevo rol
      };
      
      const handleConfirmEditRole = () => {
        // Edita el rol del integrante
        const updatedMembers = [...allMembers];

        updatedMembers[memberToEditIndex].role = newRole;
        setAllMembers(updatedMembers);
      
        // Cierra la ventana modal de edición del rol
        setShowEditRole(false);
        setNewRole(""); // Limpia el campo de entrada del nuevo rol
      };

    const handleCloseDeleteConfirmation = () => {
      setShowDeleteConfirmation(false);
    };
    
    const handleConfirmRemoveMember = () => {
      // Elimina al integrante
      const updatedMembers = [...allMembers];
      updatedMembers.splice(memberToRemoveIndex, 1);
      setAllMembers(updatedMembers);
    
      // Cierra la ventana modal de confirmación
      setShowDeleteConfirmation(false);
    };

    const handleEditMember = (event) => {
        // Muestra la ventana modal de edición del rol
        let index= allMembers.findIndex(member => member.userId === parseInt(event.currentTarget.id) || member.userId === event.currentTarget.id );
        if(memberToEditIndex === index){
            setShowEditRole(true);
        }else{
            setMemberToEditIndex(index);}

      };

    const handleRemoveMember = (event) => {
        // Muestra la ventana modal de confirmación
        let index= allMembers.findIndex(member => member.userId === parseInt(event.currentTarget.id) || member.userId === event.currentTarget.id );
        if(memberToRemoveIndex === index){
            setShowDeleteConfirmation(true);
        }else{
            setMemberToRemoveIndex(index);}
        
      };

    const handleAddMember = () => {
    // Muestra la ventana modal de agregar integrante
    setShowAddMember(true);
    };

    useEffect(()=>{
        if(props.members){
            setAllMembers(props.members)
        }
    },[props.members])

    useEffect(() => {
    if(memberToRemoveIndex && memberToRemoveIndex !== (-1) ){
        setEditingName(getNameEditingRole(memberToRemoveIndex))
        setShowDeleteConfirmation(true);
    }
    },[memberToRemoveIndex])

    useEffect(() => {
    if(memberToEditIndex && memberToEditIndex !== (-1)){
        setEditingName(getNameEditingRole(memberToEditIndex))
        setShowEditRole(true);
    }
    },[memberToEditIndex])
    return(
        <div className="listContainer">
             <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {allMembers.map((member, index) => (
                    <ListItem id={member.userId}>
                    <ListItemAvatar>
                        
                    <Avatar sx={{ bgcolor: deepOrange[500] }}
                            alt={member.label}
                            src={member.icon}>
                        
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={member.label} secondary={member.role?.charAt(0).toUpperCase() + member.role?.slice(1)} />
                    <IconButton id={member.userId} aria-label="Eliminar" color="error" onClick={handleRemoveMember} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton  id={member.userId} aria-label="Editar" color="primary" onClick={handleEditMember}>
                        <EditIcon />
                    </IconButton>
                    </ListItem>
        ))}

     
    
    </List>
    <Fab
        style={{ backgroundColor: 'orangered', color: 'white' }}
        aria-label="Agregar Integrante"
        className="fab-button"
        onClick={handleAddMember} // Agrega una función para manejar la acción de agregar integrantes
      >
        <AddIcon />
      </Fab>

      <Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas eliminar al integrante: {editingName} ?

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
                Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirmRemoveMember}>
                Eliminar
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showEditRole} onHide={handleCloseEditRole}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Rol del Integrante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack spacing={2}>
                        <p> {editingName}</p>
                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Elegir Rol...</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={newRole}
                                          label="Facultad"
                                          onChange={(e) => setNewRole(e.target.value)}
                                        >
                                            <MenuItem value='director'>Director</MenuItem>
                                          <MenuItem value='investigador'>Investigador</MenuItem>

                                        </Select>
                                      </FormControl> 
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditRole}>
                    Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmEditRole}>
                    Guardar
                    </Button>
                </Modal.Footer>
        </Modal>

        <Modal show={showAddMember} onHide={handleCloseAddMember}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Integrante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack spacing={2}>
                <Autocomplete
                    disablePortal
                    id="nameUser"
                    value={selectedName}
                    onChange={(event, newValue) => {
                      setSelectedName(newValue);
                    }}
             
                    options={allUsers}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Nombre de nuevo Integrante:" />}
                    />

                <Autocomplete
                                    disablePortal
                                    id="emailUser"
                                    value={selectedEmail}
                                    onChange={(event, newValue) => {
                                    setSelectedName(newValue);
                                    }}
                            
                                    options={allMembersEmails}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Email de Nuevo Integrante" />}
                                    />

                <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Elegir Rol...</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedRole}
                                            label="Facultad"
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            >
                                                <MenuItem value='director'>Director</MenuItem>
                                            <MenuItem value='investigador'>Investigador</MenuItem>

                                            </Select>
                                        </FormControl> 
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddMember}>
                Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirmAddMember}>
                Agregar
                </Button>
            </Modal.Footer>
        </Modal>

        </div>
    )
}

export default MembersListPage;