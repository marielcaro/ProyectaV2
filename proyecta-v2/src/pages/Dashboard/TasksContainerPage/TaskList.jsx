import React, { useState } from 'react';
import Task from './Task';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import './tasksContainerPage.css';

const TaskList = (props) => {
  const [tasks, setTasks] = useState(props.tasks)
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

  const handleOnDragEnd = (result)  => {
    const value = props.onDragHandler(result)
    return value;

  }
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `8px 16px ${grid}px 8px`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

 
  return (
    <div className="task-list" onDragEnd={handleOnDragEnd}>
           {props.tasks.map((task, index) => (
             <Draggable
             key={task.id}
             draggableId={task.id}
             index={index}
           >
             {(provided, snapshot) => (
                     <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     style={getItemStyle(
                       snapshot.isDragging,
                       provided.draggableProps.style
                     )}
                   >
                            <Task task={task}/>
                   </div>
           ) }
           </Draggable>
      ))}
         

    
      
    </div>
  );
}

export default TaskList;