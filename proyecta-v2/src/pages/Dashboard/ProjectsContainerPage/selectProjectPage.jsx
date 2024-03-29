import React, { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
import './projectsContainerPage.css'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalAddProject from './modalAddProject';
import axios from 'axios';


const SelectProjectPage = (props) => {
   const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

   const  [proyectos, setProyectos]  = useState(props.projectList);
const [showAdd, setShowAdd] = useState(false);
const [enableButton, setEnableButton] = useState(false);

const handleClickAdd = () => {
   setShowAdd(true)
}

const handleCloseAdd = () => {
   setShowAdd(false)
}

const handleAddProject = (obj) => {
   props.addProject(obj)
   setShowAdd(false)
}

   const allAllowedMembers = [
      {"label":"Mariel Caro", 
          "userId": 1},
          {"label":"Mica Chamut", 
          "userId": 2},
          {"label":"Juan Manuel Romano", 
          "userId": 3},
          {"label":"Hernan Peinetti", 
          "userId": 4}
  ]

  const allAllowedLeaders = [
   {"label":"Mabel Sosa", 
       "userId": 1},
       {"label":"Sergio Herrera", 
       "userId": 2},
       {"label":"David Rios", 
       "userId": 3},
       {"label":"Carolina Obeid", 
       "userId": 4}
]

const allAllowedTags = [
   {"label":"Ciencias de la Computación", 
       "userId": 1},
       {"label":"Inteligencia Artificial", 
       "userId": 2},
       {"label":"Administración de Empresas", 
       "userId": 3},
       {"label":"Videojuegos", 
       "userId": 4}
]

const obtenerCategoriaPerfil = async () => {
   try {
      const token = localStorage.getItem('token');
      const perfilId = localStorage.getItem('perfilId');
     // Hacer la solicitud al endpoint GetPerfilCategoriaByPerfilId en C#
     const response = await axios.get(`${apiEndpoint}/Perfil/GetPerfilCategoriaByPerfilId?perfilId=${perfilId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
      },
    });
     
   
       const data = response.data;
       // Verificar la categoría recibida (suponiendo que el campo 'categoria' contiene la categoría del perfil)
       if (data === 'Estudiante') {
         // Si la categoría del perfil es 'Estudiante', deshabilitar el botón
         setEnableButton(false);
       } else {
         // Si no es 'Estudiante', habilitar el botón
         setEnableButton(true);}
       
     
   } catch (error) {
     console.error('Error al obtener la categoría del perfil:', error);
     // Manejar el error si ocurre un problema con la solicitud
   }
 };

useEffect(()=> {
   if(props.projectList)
      setProyectos(props.projectList)
      obtenerCategoriaPerfil();
},[props.projectList])

// useEffect(()=> {

// },[])

    return(
      <div className="selectProject">
            <Box display="flex" flexDirection="column">
                  <Box mx={'auto'} mb={2} alignSelf="flex-end">
               <Button variant="contained"  aria-label="add" sx={{ borderRadius: '20px' }} onClick={handleClickAdd}  disabled={!enableButton} >
               <AddIcon />
               Dar de Alta Nuevo Proyecto
               </Button>
               </Box>
         <div className="projectCardList">
               { proyectos ? proyectos.map((proyecto, index) => (
                     <ProjectCard  key={index} proyecto={proyecto} handleClickProject={(id) => props.handleClickProject(id)}  />
                  )): "Aún no hay proyectos asociados"}

         </div>
      
         </Box>
         <ModalAddProject modalShow={showAdd} allAllowedMembers={allAllowedMembers} allAllowedLeaders={allAllowedLeaders} allTags={allAllowedTags} handleShowAdd ={handleClickAdd} handleCloseAdd ={handleCloseAdd} handleAddProject={(obj) => handleAddProject(obj)}/>
   </div>
     )

}

export default SelectProjectPage