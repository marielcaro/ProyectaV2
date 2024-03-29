import React, { useEffect, useState } from 'react';
import './projectsContainerPage.css'
import Card from 'react-bootstrap/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import { orange } from '@mui/material/colors';

const ProjectCard = (props) => {
  const [membersList, setMembersList] = useState(props.proyecto.listaIntegrantes);
  const tagList = props.proyecto.etiquetaModels;

  const handleClick = (event) => {
   props.handleClickProject(event.currentTarget.id)
 }

    const iconsMembers = (elements) => {
        let listItem = [];
    
            for(var i=0;i<elements.length;i++){
              // push the component to elements!
              listItem.push( <Avatar  alt={elements[i].nombreCompleto} src={elements[i].fotoPerfil} />);
        }
    
        return listItem;
    }

    useEffect(() => {
      setMembersList(props.proyecto.listaIntegrantes)
    }, [props.proyecto.listaIntegrantes])

    return(
     <div>
        <Card id={props.proyecto.proyectId} className="projectCard shadow p-3 mb-3 bg-body rounded"  onClick={handleClick}>
      <Card.Body>
        <Card.Title className="projectCardTitle">
        <div className='row'>
        <Stack direction="row" spacing={2}>
        <Avatar alt="Proyecto 1" src={props.proyecto.icon} />
        <h5 >    {props.proyecto.proyectName} </h5>
    
        </Stack>

        </div>
        </Card.Title>
        <Card.Text className="ps-5">       
            <Stack spacing={1} >
                <h6 className='taskNumber'> Tareas Cumplidas: {props.proyecto ? props.proyecto.nroTotalTareas : 0} / {props.proyecto  ? props.proyecto.nroTareasCompletas : 0}  </h6>
                    
                <Stack  direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }} >
                {tagList.map((tag, index) => (
                <Chip label={tag.nombreEtiqueta} sx={{ backgroundColor: orange[200] }} key={index} p />
            ))}
                </Stack>
                    
                <AvatarGroup  max={6}>
                {iconsMembers(membersList)}
                </AvatarGroup>
                </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
     </div>
     )

}

export default ProjectCard