import React, { useEffect, useState } from 'react';
import './projectsContainerPage.css'
import Card from 'react-bootstrap/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'
import Chip from '@mui/material/Chip';
import { orange } from '@mui/material/colors';

const ProjectCard = (props) => {
  const [membersList, setMembersList] = useState(props.proyecto.allProjectMembers);
  const tagList = props.proyecto.tags;

  const handleClick = (event) => {
   props.handleClickProject(event.currentTarget.id)
 }

    const iconsMembers = (elements) => {
        let listItem = [];
    
            for(var i=0;i<elements.length;i++){
              // push the component to elements!
              listItem.push( <Avatar  alt={elements[i].label} src="./" />);
        }
    
        return listItem;
    }

    useEffect(() => {
      setMembersList(props.proyecto.allProjectMembers)
    }, [props.proyecto.allProjectMembers])

    return(
     <div>
        <Card id={props.proyecto.projectId} className="projectCard shadow p-3 mb-3 bg-body rounded"  onClick={handleClick}>
      <Card.Body>
        <Card.Title className="projectCardTitle">
        <div className='row'>
        <Stack direction="row" spacing={2}>
        <Avatar alt="Proyecto 1" src={props.proyecto.icon} />
        <h5 >    {props.proyecto.projectName} </h5>
    
        </Stack>

        </div>
        </Card.Title>
        <Card.Text className="ps-5">       
            <Stack spacing={1} >
                <h6 className='taskNumber'> Tareas Cumplidas: {props.proyecto.tasks.numberOfCompletedTasks} / {props.proyecto.tasks.totalNumberOfTasks}  </h6>
                    
                <Stack direction="row" spacing={1}>
                {tagList.map((tag, index) => (
                <Chip label={tag.label} sx={{ backgroundColor: orange[200] }} key={index} p />
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