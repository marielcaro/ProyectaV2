import React, { useState } from 'react';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import image from '../../../assets/images/project-management.png'
import ModalTask from './ModalTask';

const Task = (props) => {

  const [taskData, setTaskData] = useState({taskName: 'titleTask', taskProject:'titleProject',taskEndDate: '25/08/2023', taskDetail: 'Descripción de la Tarea', taskAuthor: 'Hernán Peinetti', taskMembers:[{label:'Mariel Caro', userId: 1},{label:'Juan Manuel Romano', userId: 2}]})
  return (
  <>
    <div id= {props.task.id} className="task" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
<ModalTask taskData={taskData}/>
</>
   
  );
}

export default Task;