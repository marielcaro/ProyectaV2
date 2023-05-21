import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

import './tasksContainerPage.css';

const Taskboard = () => {
  const [tasks1, setTasks1] = useState([
    { id: uuidv4(), content: 'Task 1' },
    { id: uuidv4(), content: 'Task 2' },
    { id: uuidv4(), content: 'Task 3' },
  ]);

  const [tasks2, setTasks2] = useState([
    { id: uuidv4(), content: 'Task 4' },
    { id: uuidv4(), content: 'Task 5' },
    { id: uuidv4(), content: 'Task 6' },
  ]);

  const [tasks3, setTasks3] = useState([
    { id: uuidv4(), content: 'Task 7' },
    { id: uuidv4(), content: 'Task 8' },
    { id: uuidv4(), content: 'Task 9' },
  ]);

  const [tasks4, setTasks4] = useState([
    { id: uuidv4(), content: 'Task 10' },
    { id: uuidv4(), content: 'Task 11' },
    { id: uuidv4(), content: 'Task 12' },
    { id: uuidv4(), content: 'Task 13' },
    { id: uuidv4(), content: 'Task 14' },
    { id: uuidv4(), content: 'Task 15' },
  ]);


  const [state, setState] = useState([ { id: "0", name:"Nuevas", tasks : tasks1 }, {id:"1" , name:"En Progreso", tasks : tasks2}, {id:"2" ,  name:"Resueltas", tasks : tasks3},{id:"3" ,  name:"Finalizadas", tasks : tasks4}]);
  
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
          
           <TaskList tasks={el.tasks} onDragHandler={handleOnDragEnd} />
           {provided.placeholder}
         </div>
       )}
     </Droppable>
     </div>
     </div>
    ))}
    </DragDropContext>
    </div>
  );
}

export default Taskboard