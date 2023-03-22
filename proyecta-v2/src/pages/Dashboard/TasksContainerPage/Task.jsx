import React from 'react';

const Task = (props) => {

  return (
    <div className="task">
      {props.task.content}
    </div>
  );
}

export default Task;