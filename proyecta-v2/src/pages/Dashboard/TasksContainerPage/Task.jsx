import React from 'react';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'

const Task = (props) => {

  return (
    <div id= {props.task.id} className="task">
      <div className='row'>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Proyecto 1" src={image} />
      <h5 className='titleTask'>    {props.task.content} </h5>
  
      </Stack>

      </div>
      <div className='row'>
        <h6 className='titleProject'> Proyecto 1 </h6>
      </div>
      <div className='row'>
        <p className='descriptionTask'> Armar una juntada decente para ver John Wick </p>
      </div>
      <div className='avatarGroup row'>
          <AvatarGroup  max={4}>
            <Avatar  alt="Hernan Peinetti" src="./" /> 
            <Avatar alt="Juan Manuel Romano" src="./"  />
            <Avatar alt="Micaela Baitera Chamut" src="./"  /> 
            <Avatar alt="Mariel Caro" src="./"  /> 
            <Avatar alt="Amir Saul Abdul" src="./"  /> 
        </AvatarGroup>
      </div>
    </div>
  );
}

export default Task;