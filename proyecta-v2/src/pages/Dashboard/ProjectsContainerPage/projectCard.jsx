import React, { useEffect, useState } from 'react';
import './projectsContainerPage.css'
import Card from 'react-bootstrap/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'
import Chip from '@mui/material/Chip';
import { orange } from '@mui/material/colors';

const ProjectCard = () => {
  const membersList = [{id:1, label:"Mariel Caro"},{id:2, label:"Juan Manuel Romano"},{id:3, label:"Mica Chamut"},]
    const iconsMembers = (elements) => {
        let listItem = [];
    
            for(var i=0;i<elements.length;i++){
              // push the component to elements!
              listItem.push( <Avatar  alt={elements[i].label} src="./" />);
        }
    
        return listItem;
    }

    return(
     <div>
        <Card className="projectCard shadow p-3 mb-3 bg-body rounded" >
      <Card.Body>
        <Card.Title className="projectCardTitle">
        <div className='row'>
        <Stack direction="row" spacing={2}>
        <Avatar alt="Proyecto 1" src={image} />
        <h5 >    Proyecto 1</h5>
    
        </Stack>

        </div>
        </Card.Title>
        <Card.Text className="ps-5">       
            <Stack spacing={1} >
                <h6 className='taskNumber'> Tareas Cumplidas: 16/24 </h6>
                    
                <Stack direction="row" spacing={1}>
                    <Chip label="# TAG 1" sx={{ backgroundColor: orange[200] }} />
                    <Chip label="# TAG 2"sx={{ backgroundColor: orange[200] }}  />
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