import React, { useEffect, useState } from 'react';
import './membersListPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';


const MembersListPage = (props) => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    const [allMembers, setAllMembers] = useState(props.members);
    const [editingName, setEditingName] = useState("");
    const [newRole, setNewRole] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [memberToRemoveIndex, setMemberToRemoveIndex] = useState(-1);
    const [showEditRole, setShowEditRole] = useState(false);
    const [memberToEditIndex, setMemberToEditIndex] = useState(-1);
    const [showAddMember, setShowAddMember] = useState(false);
    const [selectedName, setSelectedName] = useState({ id: "", email: "", nombreCompleto: "", categoria: ""});
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const [allUsers, setAllUsers] = useState([]);

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
          perfilId: selectedName.id,
          proyectId: props.projectId,
          rol: selectedRole,
        };

        fetchAddMember(newMember)
      
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

        fetchUpdateRoleMember(memberToEditIndex, props.projectId, newRole);
       
        // Cierra la ventana modal de edición del rol
        setShowEditRole(false);
        setNewRole(""); // Limpia el campo de entrada del nuevo rol
      };

    const handleCloseDeleteConfirmation = () => {
      setShowDeleteConfirmation(false);
    };
    
    const handleConfirmRemoveMember = () => {
      // Elimina al integrante
      fetchDeleteMember(memberToRemoveIndex, props.projectId)
     
      // Cierra la ventana modal de confirmación
      setShowDeleteConfirmation(false);
    };

    const handleEditMember = (event) => {
        // Muestra la ventana modal de edición del rol
        let index = event.currentTarget.id;

        if(memberToEditIndex === index){
            setShowEditRole(true);
        }else{
            setMemberToEditIndex(index);}

      };

    const handleRemoveMember = (event) => {
        // Muestra la ventana modal de confirmación

        let index= event.currentTarget.id;
        if(memberToRemoveIndex === index){
            setShowDeleteConfirmation(true);
        }else{
            setMemberToRemoveIndex(index);}
        
      };
      const fetchMembersProject = async (id) => {
        try {
          const token = localStorage.getItem('token');
           
          
          const response = await axios.get(`${apiEndpoint}/Integrante/IntegrantesPorProyecto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setAllMembers(response.data)
        } catch (error) {
          if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud, verifique los datos ingresados")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Datos no encontrados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
        }
      };

      const fetchDeleteMember = async (perfilId, proyectoId) => {
        try {
          const token = localStorage.getItem('token');
                     
          const response = await axios.delete(`${apiEndpoint}/Integrante/EliminarIntegrante?perfilId=${perfilId}&proyectoId=${proyectoId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchMembersProject(proyectoId)
        } catch (error) {
          if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud, verifique los datos ingresados")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Datos no encontrados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
        }
      };

      const fetchUpdateRoleMember = async (perfilId, proyectoId, rol) => {
        try {
          const token = localStorage.getItem('token');
                     
          const response = await axios.put(`${apiEndpoint}/Integrante/ActualizarIntegrante?perfilId=${perfilId}&proyectoId=${proyectoId}&Rol=${rol}`, null, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchMembersProject(proyectoId)
        } catch (error) {
          if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud, verifique los datos ingresados")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Datos no encontrados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
        }
      };

      const fetchAddMember = async (obj) => {
        try {
          const token = localStorage.getItem('token');
           
          const rol = obj.rol
          const perfilId = obj.perfilId
          const proyectoId = obj.proyectId
          
          const response = await axios.post(`${apiEndpoint}/Integrante/CrearIntegrante?Rol=${rol}&perfilId=${perfilId}&proyectoId=${proyectoId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchMembersProject(obj.proyectId)
        } catch (error) {
          if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud, verifique los datos ingresados")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Datos no encontrados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
        }
      };

      const fetchMembers = async () => {
        try {
          const token = localStorage.getItem('token');
           
          
          const response = await axios.get(`${apiEndpoint}/Perfil/GetAllResume`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setAllUsers(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
          if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud, verifique los datos ingresados")
            }else if(error.response.status === 404){
              ErrorToast("Error interno, Datos no encontrados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
        }
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

    useEffect(()=> {
        fetchMembers()
    },[])
    return(
        <div className="listContainer">
             <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {allMembers.map((member, index) => (
                    <ListItem id={member.perfilId}>
                    <ListItemAvatar>
                        
                    <Avatar sx={{ bgcolor: deepOrange[500] }}
                            alt={member.nombreCompleto}
                            src={member.icon}>
                        
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={member.nombreCompleto} secondary={member.rol?.charAt(0).toUpperCase() + member.rol?.slice(1)} />
                    <IconButton id={member.perfilId} aria-label="Eliminar" color="error" onClick={handleRemoveMember} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton  id={member.perfilId} aria-label="Editar" color="primary" onClick={handleEditMember}>
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
                                          label="Rol"
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
                    options={allUsers}
                    getOptionLabel={(option) => option.nombreCompleto}
                    isOptionEqualToValue={(option, value) => option.nombreCompleto === value.nombreCompleto}
                    value={selectedName === undefined || selectedName===""? "" : selectedName}
                    onChange={(event, newValue) => {
                      setSelectedName(newValue);
                    }}           
                   
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Nombre de nuevo Integrante:" />}
                    />
            <TextField
                type="text"
                placeholder="Email"
                InputProps={{
                    readOnly: true,
                }}
                value={selectedName !== null ? selectedName.email : ""}
              />

                <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Elegir Rol...</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedRole}
                                            label="Rol"
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