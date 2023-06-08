import React, { useState } from "react";
import "./TodoItem.css";

function TodoItem({ task, onUpdate, onDelete, onComplete }) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleEdit = () => {
    if (!task.completed) {
      setEditing(true);
    }
  };

  const handleUpdate = () => {
    if (updatedTask.title.trim() === "") {
      return;
    }
    onUpdate(task.id, updatedTask);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <li className={`todo-item ${task.completed ? "completed" : "pending"}`}>
      {!editing ? (
        <div>
          <h3>{task.title}</h3>
          <span>Due Date: {task.dueDate}</span>
          <p>{task.description}</p>
          <div className="actions">
            <button
              className="edit-button"
              onClick={handleEdit}
              disabled={task.completed}
            >
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
            <button className="complete-button" onClick={handleComplete}>
              {task.completed ? "Pending" : "Complete"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />
          <input
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
          />
          <input
            value={updatedTask.dueDate}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
            }
          />
          <div className="actions">
            <button className="save-button" onClick={handleUpdate}>
              Save
            </button>
            <button className="cancel-button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
