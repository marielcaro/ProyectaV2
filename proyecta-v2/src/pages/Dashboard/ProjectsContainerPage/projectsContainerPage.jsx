import React, { useEffect, useState } from 'react';
import SelectProjectPage from './selectProjectPage';
import './projectsContainerPage.css'
import ProjectPage from './projectPage';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';
import Loader from '../../../components/Loader/Loader';


const ProjectsContainerPage = () => {
  const [loading, setLoading] = useState(false);

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [projectList, setProjectList] = useState(null);
    const [noProyectMessage, setNoProyectMessage] = useState("");

    const [selectedCard, setSelectedCard] = useState(null);
    const [showList, setShowList] = useState(true);
    const handleClickProject = (id) => {
        fetchProyectById(id);
       
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
        
        fetchAddProyect(obj)
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

      const fetchDeleteProyect = async (id) => {
        try {
          const token = localStorage.getItem('token');
            
          const response = await axios.delete(`${apiEndpoint}/Proyecto/EliminarProyecto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          fetchProyectList() //Actualizar board
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
          fetchProyectById(id)
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

      const fetchProyectById = async (id) => {
        try {
          const token = localStorage.getItem('token');
           
          
          const response = await axios.get(`${apiEndpoint}/Proyecto/ObtenerProyecto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });

          if( response.data.fotoPerfil !=='/static/media/default.fc4a208129bf95b5c670.png'){
                // Convertir la cadena base64 a un Blob
                const byteCharacters = atob(response.data.fotoPerfil.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' });

                // Obtener el tamaño del Blob en bytes
                const imageSizeInBytes = blob.size;
                console.log(`El tamaño de la imagen proyecto base64 es: ${imageSizeInBytes} bytes`);
          }
            
          setSelectedCard(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.

           

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

    const fetchProyectList = async () => {
        try {
          setLoading(true);
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
         finally{
            setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
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
          {loading && <Loader />} {/* Muestra el Loader cuando `loading` es true */}
        {showList ? <SelectProjectPage projectList={projectList} handleClickProject={(id) => handleClickProject(id)} addProject={(obj) => addProjectMethod(obj)}/> : 
        <ProjectPage project={selectedCard} backTrack={handleBackTrack} deleteProject={(id)=>handleDeleteData(id)} editFoto={(id,img) => handleEditFotoData(id,img)} editInfo= {(id,obj) => handleEditData(id,obj)} editLinks={(id,section, list) =>handleEditLinks(id,section,list)} />}
     </div>
     )

}

export default ProjectsContainerPage