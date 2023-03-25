import React from 'react';

const Task = (props) => {

  return (
    <div id= {props.task.id} className="task">
      {props.task.content}
    </div>
  );
}

export default Task;