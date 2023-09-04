import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import ModalTask from './ModalTask';
import './tasksContainerPage.css';
import data from "./mockData.json"

const Taskboard = (props) => {
  const [newTaskList, setNewTaskList] = useState(props.projectAllInfo.newTasks);

  const [inProgressTaskList, setInProgressTaskList] = useState(props.projectAllInfo.inProgressTasks);

  const [resolvedTaskList, setResolvedTaskList] = useState(props.projectAllInfo.resolvedTasks);

  const [completedTaskList, setCompletedTaskList] = useState(props.projectAllInfo.endedTasks);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const [state, setState] = useState([ { id: "0", name:"Nuevas", tasks : newTaskList }, {id:"1" , name:"En Progreso", tasks : inProgressTaskList}, {id:"2" ,  name:"Resueltas", tasks : resolvedTaskList},{id:"3" ,  name:"Finalizadas", tasks : completedTaskList}]);

  const [taskData, setTaskData] = useState( {
    id: "607386e5-e1ad-4d25-bffb-a3b98131ced9", 
    title: "Task 1",
    projectName : "Proyecto 1",
   lastUpdatedUser: "Mariel Caro",
    lastUpdatedDate:"2023-08-23T18:00:00",
    status: "ended",
    author:"Hernan Peinetti",
    endDate:"2023-08-30T18:00:00",
    description: "Descripción 1: Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.",
    members: [
       {label:"Mariel Caro", 
       userId: 1},
       {label:"Mica Chamut", 
       userId: 2}
    ] }) 

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
    let selectedTask=searchTask(selectedTaskId)
    setTaskData((taskData)=>({...taskData,...selectedTask}))
    console.log(selectedTaskId)
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
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  
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
      const result = move(state[parseInt(sInd, 10)].tasks, state[parseInt(dInd, 10)].tasks, source, destination);
        const newState = [...state];
      newState[parseInt(sInd, 10)].tasks = result[parseInt(sInd, 10)];
      newState[parseInt(dInd, 10)].tasks = result[parseInt(dInd, 10)];

      setState(newState);
    }
  }



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