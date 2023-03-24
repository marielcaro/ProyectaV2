import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

const Taskboard = () => {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), content: 'Task 1' },
    { id: uuidv4(), content: 'Task 2' },
    { id: uuidv4(), content: 'Task 3' },
  ]);

  const handleOnDragEnd = (result)  => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <TaskList tasks={tasks} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Taskboard