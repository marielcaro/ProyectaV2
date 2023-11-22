import { Grid } from '@mui/material';
import { Card  } from 'react-bootstrap';
import './dashboardContainer.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { refreshToken } from '../../../services/tokenService';
import Loader from '../../../components/Loader/Loader';


const DashboardContainer = () => {
  const [loading, setLoading] = useState(false);

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [proyectList, setProyectList] = useState([]);
    const [noProyectMessage, setNoProyectMessage] = useState("");
    const [tareaList, setTareaList] = useState([]);
    const [noTareaMessage, setNoTareaMessage] = useState("");
    const [eventoList, setEventoList] = useState([]);
    const [noEventoMessage, setNoEventoMessage] = useState("");

    function convertirFecha(fechaString) {
      const fecha = new Date(fechaString);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${año}`;
      return fechaFormateada;
    }

    function convertirHora(horaString) {
      const partesHora = horaString.split(":");
      const hora = partesHora[0];
      const minutos = partesHora[1];
      const horaFormateada = `${hora}:${minutos}`;
      return horaFormateada;
    }

    const EventoItem = (props) => {
        return(
            <ListItem>
            <ListItemAvatar>
            <Avatar alt={props.evento.titulo} src={props.evento.proyectoIcon} />
            </ListItemAvatar>
            <ListItemText primary={props.evento.titulo + " - " + props.evento.nombreProyecto} secondary={convertirFecha(props.evento.fechaInicio) +" - "+ convertirHora(props.evento.horaInicio)}/>
            </ListItem>
        );
    } 

    const TareaItem = (props) => {
        return(
            <ListItem>
            <ListItemAvatar>
            <Avatar alt={props.tarea.nombreTarea} src={props.tarea.proyectIcon} />
            </ListItemAvatar>
            <ListItemText primary={props.tarea.nombreTarea} secondary={props.tarea.proyectName}/>
            </ListItem>
        );
    } 

    const ProyectItem = (props) => {
        return(
            <ListItem>
            <ListItemAvatar>
            <Avatar alt={props.proyecto.proyectName} src={props.proyecto.proyectIcon} />
            </ListItemAvatar>
            <ListItemText primary={props.proyecto.proyectName}/>
            </ListItem>
        );
    } 

    const fetchProyectList = async () => {
        try {
          setLoading(true);

          const token = localStorage.getItem('token');
    
          // Obtiene el userName almacenado en localStorage
        const perfilId = localStorage.getItem('perfilId');
    
    
          const response = await axios.get(`${apiEndpoint}/Proyecto/GetProyectsByProfileIdResume/${perfilId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setProyectList(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
            setNoProyectMessage("Aún no tienes asociado ningún proyecto")
            
        }
      
          finally{
            setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
        }
      };
      
      const fetchTareaList = async () => {
        try {
          setLoading(true);

          let token = localStorage.getItem('token');
    
          // Obtiene el userName almacenado en localStorage
        const perfilId = localStorage.getItem('perfilId');
        token = await refreshToken(apiEndpoint, token, localStorage.getItem('refreshToken'));
    
          const response = await axios.get(`${apiEndpoint}/Tarea/ObtenerTareasPorPerfil/${perfilId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setTareaList(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
            setNoTareaMessage("Aún no tienes asociada ninguna tarea")
            
        }finally{
          setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
      }
      };

      const fetchEventoList = async () => {
        try {
          setLoading(true);

          const token = localStorage.getItem('token');
    
          // Obtiene el userName almacenado en localStorage
        const perfilId = localStorage.getItem('perfilId');
    
    
          const response = await axios.get(`${apiEndpoint}/Evento/ObtenerEventoResumePorPerfil/${perfilId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setEventoList(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
        } catch (error) {
            setNoEventoMessage("Aún no tienes asociado ningún evento")
            
        }finally{
          setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
      }
      };


      useEffect(()=>{
        if (localStorage.getItem('token') && localStorage.getItem('perfilId')) {

          fetchProyectList()
          fetchTareaList()
          fetchEventoList()
        }
      },[])
    return(
    
            <Grid className='dashboardContainer' container spacing={2}>
                {loading && <Loader />} {/* Muestra el Loader cuando `loading` es true */}

                {/* Columna 1: Lista de Proyectos */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        PROYECTOS
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de proyectos */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        { !noProyectMessage ? proyectList.map((proyecto) => (
                                            <ProyectItem proyecto={proyecto}/>
                                          )): noProyectMessage }                          
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>

                {/* Columna 2: Lista de tareas pendientes */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(128, 128, 128, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        TAREAS PENDIENTES
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de tareas pendientes */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        { !noTareaMessage ? tareaList.map((tarea) => (
                                            <TareaItem tarea={tarea}/>
                                          )): noTareaMessage }  
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>

                {/* Columna 3: Lista de próximos eventos */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="dashboardCard" variant="outlined" sx={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.1)' }}>
                    <Card.Title className="dashboardCardTitle">
                        PRÓXIMOS EVENTOS
                    </Card.Title>
                    <Card.Body>
                        {/* Contenido de la lista de próximos eventos */}
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        { !noEventoMessage ? eventoList.map((evento) => (
                                            <EventoItem evento={evento}/>
                                          )): noEventoMessage }  
                        </List>
                    </Card.Body>
                    </Card>
                </Grid>
            </Grid>

    )
}


export default DashboardContainer