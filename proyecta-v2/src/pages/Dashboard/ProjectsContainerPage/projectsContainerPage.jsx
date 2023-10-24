import React, { useEffect, useState } from 'react';
import SelectProjectPage from './selectProjectPage';
import './projectsContainerPage.css'
import data from "./mockDataProject.json"
import ProjectPage from './projectPage';
import axios from 'axios';


const ProjectsContainerPage = () => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [projectList, setProjectList] = useState(null);
    const [noProyectMessage, setNoProyectMessage] = useState("");

    const [selectedCard, setSelectedCard] = useState(null);
    const [showList, setShowList] = useState(true);
    const handleClickProject = (id) => {
        // let card = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        fetchProyectById(id);
        // setSelectedCard(card);
    }

    const handleBackTrack = () =>{
        setShowList(true)
        setSelectedCard(null);
    }

    const handleEditLinks = (id,section, linkList) =>{
      let tipo = "";
      switch(section){
        case "documentLinks":
          tipo="Documentacion"
          break;
        case "bibliografy":
          tipo="Bibliografia";
          break;
        case "production":
          tipo="Produccion";
          break;
        case "laboratory":
          tipo="Laboratorio";
          break;
      }

      fetchEditEnlaces(id,tipo,linkList)
        // let aux = [...projectList]
        // let py = projectList.find( x => x.projectId === parseInt(id) || x.projectId === id)
        // let pyIndex = projectList.findIndex( x => x.projectId === parseInt(id) || x.projectId === id)
        // py[section] = linkList;
        // aux[pyIndex]= py
        // setProjectList(aux)
    }

    const handleEditData = (id, obj) => {
      fetchEditProyectInfo(id, obj)
    }

    const handleDeleteData = (id) => {
        fetchDeleteProyect(id)
        setShowList(true)

    }

    const handleEditFotoData = (id, img) =>{
     
        fetchEditProyectFoto(id, img);

    }



    const addProjectMethod = (obj) =>{
        // let aux = [...projectList]
        // aux.push(obj)
        fetchAddProyect(obj)
        // setProjectList(aux)
    }
    const fetchAddProyect = async (obj) => {
        const requestData = {
            nombreProyecto: obj.projectName,
            descripcion: obj.description,
            nroResolucion: obj.nroResolucion,
            fechaAlta: obj.startDate,
            fotoIcon: obj.icon,
            departamento: obj.departamento,
            nombreFacultad: obj.facultad,
            etiquetas: obj.tags,
            directores: obj.leaders,
            integrantes: obj.members
          };


        try {
         const token = localStorage.getItem('token');    
    
          const response = await axios.post(`${apiEndpoint}/Proyecto/CrearProyecto`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          console.log('Registro exitoso:', response.data);
          fetchProyectList();
          
        } catch (error) {
            console.log('Error');
            
        }
      };

      const fetchEditProyectInfo = async (id, obj) => {
        try {
          const token = localStorage.getItem('token');
          const requestData = {
            id: obj.id,
            nombreProyecto: obj.nombreProyecto,
            descripcion: obj.descripcion,
            etiquetas: obj.etiquetas
          }
    
          const response = await axios.put(`${apiEndpoint}/Proyecto/ActualizarProyecto/${id}`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchProyectList() //Actualizar board
          fetchProyectById(id)
        } catch (error) {
            
        }
      };

      const fetchDeleteProyect = async (id) => {
        try {
          const token = localStorage.getItem('token');
            
          const response = await axios.delete(`${apiEndpoint}/Proyecto/EliminarProyect/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchProyectList() //Actualizar board
        } catch (error) {
            
        }
      };

      const fetchEditEnlaces = async (id, section, linkList) => {
        try {
          const token = localStorage.getItem('token');
           
          const response = await axios.post(`${apiEndpoint}/Enlaces/CrearEnlace?proyectoGuid=${id}&tipo=${section}`, linkList, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchProyectList() //Actualizar board
          fetchProyectById(id)
        } catch (error) {
            
        }
      };


      const fetchEditProyectFoto = async (id, foto) => {
        try {
          const token = localStorage.getItem('token');
          const requestData = {
            foto: foto
          }
    
          const response = await axios.post(`${apiEndpoint}/Proyecto/ActualizarFotoProyecto/${id}`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchProyectList() //Actualizar board
          fetchProyectById()
        } catch (error) {
            
        }
      };

      const fetchProyectById = async (id) => {
        try {
          const token = localStorage.getItem('token');
           
          
          const response = await axios.get(`${apiEndpoint}/Proyecto/ObtenerProyecto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setSelectedCard(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
            
        }
      };

    const fetchProyectList = async () => {
        try {
          const token = localStorage.getItem('token');
    
          // Obtiene el userName almacenado en localStorage
        const perfilId = localStorage.getItem('perfilId');
    
    
          const response = await axios.get(`${apiEndpoint}/Proyecto/ProyectosPorPerfil/${perfilId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setProjectList(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
            setNoProyectMessage("Aún no tienes asociado ningún proyecto")
            
        }
      };

    useEffect(() => {
        if(selectedCard){
            setShowList(false)
        }

    },[selectedCard])

    useEffect(()=>{
        fetchProyectList()
      },[])

    return(
        <div>
        {showList ? <SelectProjectPage projectList={projectList} handleClickProject={(id) => handleClickProject(id)} addProject={(obj) => addProjectMethod(obj)}/> : 
        <ProjectPage project={selectedCard} backTrack={handleBackTrack} deleteProject={(id)=>handleDeleteData(id)} editFoto={(id,img) => handleEditFotoData(id,img)} editInfo= {(id,obj) => handleEditData(id,obj)} editLinks={(id,section, list) =>handleEditLinks(id,section,list)} />}
     </div>
     )

}

export default ProjectsContainerPage