import React, { useEffect, useState } from 'react';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'



const Task = (props) => {

  const handleClickTask = (event) =>{
    props.handleClickTask(event.target.offsetParent.id)
  }

  const iconsMembers = (elements) => {
    let listItem = [];

        for(var i=0;i<elements.length;i++){
          // push the component to elements!
          listItem.push( <Avatar  alt={elements[i].label} src="./" />);
    }

    return listItem;
}

  return (
  <>
    <div id= {props.task.id} className="task" data-bs-toggle="modal" onClick={handleClickTask} data-bs-target={props.target}>
      <div className='row'>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Proyecto 1" src={image} />
      <h5 className='titleTask'>    {props.task.title} </h5>
  
      </Stack>

      </div>
      <div className='row'>
        <h6 className='titleProject'> {props.task.projectName} </h6>
      </div>
      <div className='row'>
        <p className='descriptionTask'> {props.task.description} </p>
      </div>
      <div className='avatarGroup row'>
          <AvatarGroup  max={4}>
           {iconsMembers(props.task.members)}
      
        </AvatarGroup>
      </div>
    </div>

</>
   
  );
}

export default Task;