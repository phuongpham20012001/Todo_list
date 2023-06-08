import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";


function TodoList({ tasks, onUpdate, onDelete, onComplete, onFilter }) {
  const handleUpdate = (taskId, newTask) => {
    onUpdate(taskId, newTask);
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
  };

  const handleComplete = (taskId) => {
    onComplete(taskId);
  };

  return (
    <div>
      <div className="task-filters">
        <button onClick={() => onFilter("all")}>All</button>
        <button onClick={() => onFilter("completed")}>Completed</button>
        <button onClick={() => onFilter("pending")}>Pending</button>
      </div>
      <TransitionGroup className="task-list">
        {tasks.map((task) => (
          <CSSTransition key={task.id} timeout={300} classNames="task-item">
            <TodoItem
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
  
}

export default TodoList;
