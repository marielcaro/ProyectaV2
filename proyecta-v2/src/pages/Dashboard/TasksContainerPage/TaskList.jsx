import React, { useState,useEffect } from 'react';
import Task from './Task';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import './tasksContainerPage.css';

const TaskList = (props) => {
  const [tasks, setTasks] = useState(props.tasks)

  useEffect(()=> {
    setTasks(props.tasks)
  },[props.tasks])

  const handleOnDragEnd = (result)  => {
    const value = props.onDragHandler(result)
    return value;

  }
  const grid = 4;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `8px 16px ${grid}px 8px`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

 
  return (
    <div className="task-list" onDragEnd={handleOnDragEnd}>
           {props.tasks ? props.tasks.map((task, index) => (
             <Draggable
             key={task.tareaId}
             draggableId={task.tareaId}
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
                            <Task task={task} target={props.target} handleClickTask={props.handleClickTask}  />
                   </div>
           ) }
           </Draggable>
      )): ""}
         

    
      
    </div>
  );
}

export default TaskList;