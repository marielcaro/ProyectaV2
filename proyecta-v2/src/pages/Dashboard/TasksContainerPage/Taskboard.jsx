import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

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


  const [state, setState] = useState([ { id: "0", tasks : tasks1 }, {id:"1" , tasks : tasks2}, {id:"2" , tasks : tasks3}]);
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
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
  const grid = 8;

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
    <div style={{ display: "flex" }}>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {state.map((el, ind) => (
       <Droppable key={ind} droppableId={el.id}>
    
       {(provided, snapshot) => (
         <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
         {...provided.droppableProps}>
           <TaskList tasks={el.tasks} onDragHandler={handleOnDragEnd} />
           {provided.placeholder}
         </div>
       )}
     </Droppable>
    ))}
    </DragDropContext>
    </div>
  );
}

export default Taskboard