import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import ModalTask from './ModalTask';
import './tasksContainerPage.css';
import axios from 'axios';


const Taskboard = (props) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const [newTaskList, setNewTaskList] = useState(props.projectAllInfo.newTasks);

  const [inProgressTaskList, setInProgressTaskList] = useState(props.projectAllInfo.inProgressTasks);

  const [resolvedTaskList, setResolvedTaskList] = useState(props.projectAllInfo.resolvedTasks);

  const [completedTaskList, setCompletedTaskList] = useState(props.projectAllInfo.endedTasks);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const [state, setState] = useState([ { id: "0", name:"Nuevas", tasks : newTaskList }, {id:"1" , name:"En Progreso", tasks : inProgressTaskList}, {id:"2" ,  name:"Resueltas", tasks : resolvedTaskList},{id:"3" ,  name:"Finalizadas", tasks : completedTaskList}]);

  const [taskData, setTaskData] = useState( null) 

  const [selectedTaskId, setSelectedTaskId] =useState('');
  const [allAllowedMembers, setAllowedMembers] =useState(props.projectAllInfo.allProjectMembers);
 

  const handleClickCard= (id) => {
    setSelectedTaskId(id)
    handleShow()
  }
  


  const searchTask = (id) => {
    let allTasks = [];
    props.data.projects.forEach(project => {
      allTasks= allTasks.concat(project.newTasks).concat(project.inProgressTasks).concat(project.resolvedTasks).concat(project.endedTasks);
    });
    
    let task = allTasks.find(task => task.id === id)

    return task
  }

  useEffect(()=> {
    if (selectedTaskId)
      fetchGetTaskById(selectedTaskId)
 
  },[selectedTaskId])
  
useEffect(()=> {
  
  setNewTaskList(props.projectAllInfo.newTasks)
  setInProgressTaskList(props.projectAllInfo.inProgressTasks)
  setResolvedTaskList(props.projectAllInfo.resolvedTasks)
  setCompletedTaskList(props.projectAllInfo.endedTasks)

},[props.projectAllInfo])

useEffect(()=>{
  
  let newState = [ { id: "0", name:"Nuevas", tasks : newTaskList }, {id:"1" , name:"En Progreso", tasks : inProgressTaskList}, {id:"2" ,  name:"Resueltas", tasks : resolvedTaskList},{id:"3" ,  name:"Finalizadas", tasks : completedTaskList}]
  setState(newState)
},[newTaskList,inProgressTaskList,resolvedTaskList,completedTaskList])



  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightsalmon" : "white",
    borderRadius: "15px",
    padding: grid,
    width: "90%",
    overflowY: "auto",
    overflowX:"auto",
    maxHeight: "inherit"
  });

  const reorder = (list, startIndex, endIndex) => {
 
    const result = Array.from(list);
    let [removed] = result.splice(startIndex, 1);
    removed.order=endIndex;
    result.splice(endIndex, 0, removed);
    props.handleReorder(removed, endIndex)
    return result;
  };
  
  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  let [removed] = sourceClone.splice(droppableSource.index, 1);

  // Calcula el nuevo orden de la tarjeta en la lista de destino
  let newOrder= droppableDestination.index;

    removed.order = newOrder;
  // Actualiza el orden de las tarjetas en la lista de destino
  destClone.splice(newOrder, 0, { ...removed, order: newOrder });

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  // Llama a la función handleMove con la tarjeta movida y las listas afectadas
  props.handleMove(removed, droppableSource.droppableId, droppableDestination.droppableId);

  return result;
  };
  const grid = 4;

  const handleOnDragEnd = (result)  => {
   
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
  
  
    if (sInd === dInd) {
     const items = reorder(state[parseInt(sInd, 10)].tasks, source.index, destination.index);
  
      const newState = [...state];
      newState[parseInt(sInd, 10)].tasks = items;
      setState(newState);
    } else {
      let result = move(state[parseInt(sInd, 10)].tasks, state[parseInt(dInd, 10)].tasks, source, destination);

        const newState = [...state];
      newState[parseInt(sInd, 10)].tasks = result[parseInt(sInd, 10)];
      newState[parseInt(dInd, 10)].tasks = result[parseInt(dInd, 10)];

      console.log(result)
      setState(newState);
    }
  }

  const fetchGetTaskById= async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${apiEndpoint}/Tarea/ObtenerTarea/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setTaskData(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
        
    }
  };



  return (
    <div className='taskboard d-flex justify-content-around'>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {state.map((el, ind) => (
        <div className='title col g-2'>
          <div className='row'>
        <div className='columnTitle'>
        <h4>{el.name}</h4>
        <hr></hr>
        </div>
        </div>

        <div className='list row'>
       <Droppable key={ind} droppableId={el.id}>
    
       {(provided, snapshot) => (
         <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
         {...provided.droppableProps}>
          
           <TaskList tasks={el.tasks} handleClickTask={(id) => handleClickCard(id)}  target="#editTaskModal" onDragHandler={handleOnDragEnd} />
           {provided.placeholder}
         </div>
       )}
     </Droppable>
     </div>
     </div>
    ))}
    </DragDropContext>
    <ModalTask taskData={taskData} taskId={selectedTaskId} modalEditState={showEditModal}  action="edit" handleShow={()=> handleShow()}  handleClose={()=> handleClose()} handleDelete={(id) => props.handleDelete(id)} handleSave={(id, task) => props.handleSave(id, task)}  allAllowedMembers={allAllowedMembers} />
    </div>
  );
}

export default Taskboard